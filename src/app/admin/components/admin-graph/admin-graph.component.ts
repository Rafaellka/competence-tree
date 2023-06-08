import {Component, OnDestroy, OnInit} from '@angular/core';
import {ECharts, EChartsOption} from "echarts";
import {NodeService} from "../../../shared/services/node.service";
import {forkJoin} from "rxjs";
import {LinksService} from "../../../shared/services/links.service";
import {INewNodeModel, INode, nodeStyles} from "../../../shared/interfaces";


@Component({
    selector: 'app-admin-graph',
    templateUrl: './admin-graph.component.html',
    styleUrls: ['./admin-graph.component.scss']
})
export class AdminGraphComponent implements OnInit, OnDestroy {
    public echartsInstance: ECharts;
    public options: EChartsOption;
    public newNode: INode;
    public sidebarVisible: boolean = false;
    public modalVisible: boolean = false;
    public selectedNode: INode = {
        type: 'main',
        id: '',
        name: '',
        parentId: null
    };

    constructor(private nodesService: NodeService, private linksService: LinksService) {
    }

    public ngOnInit(): void {
        this.nodesService.getRolesWithGrades().subscribe(result => {
            result.forEach(nodes => {
                this.nodesService.addNewNodes(nodes);
                nodes.forEach((node, index) => {
                    if (index === 0) {
                        this.linksService.bindNewNodeWithParent(node.parentId, node);
                        return;
                    }
                    const parentId = node.type === 'grade' ? nodes[index - 1].id : null;
                    this.linksService.bindNewNodeWithParent(parentId, node);
                })
            });

            this.options = {
                tooltip: {
                    formatter: '{b}'
                },
                darkMode: true,
                series: [
                    {
                        animationEasingUpdate: 'quarticOut',
                        type: 'graph',
                        roam: true,
                        layout: 'force',
                        force: {
                            gravity: 0.05,
                            repulsion: 60,
                            edgeLength: 20
                        },
                        zoom: 5,
                        scaleLimit: {
                            min: 3,
                            max: 15
                        },
                        label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: "bold",
                            formatter: (params) => {
                                return params.name.split(' ').join('\n')
                            }
                        },
                        lineStyle: {
                            width: 2
                        },
                        data: this.nodesService.getGraphNodes(),
                        links: this.linksService.getLinks()
                    }
                ]
            };
        });
    }

    public onChartEvent(event: any) {
        if (event.dataType === 'node') {
            this.selectedNode = {...event.data};
            if (['skill', 'position'].includes(event.data.type)) {
            }
            this.sidebarVisible = true;
        }
    }

    public getSkillsAndPositions(grade: INode) {
        if (this.nodesService.checkIsParent(grade.id)) return;

        const parts = grade.id.split(':');
        const gradeId = Number(parts[parts.length - 1]);

        forkJoin([
            this.nodesService.getPositionsByGrade(gradeId),
            this.nodesService.getSkillsByGrade(gradeId)
        ]).subscribe(result => {
            this.nodesService.setIsParentNode(grade.id);
            result.forEach(nodes => {
                if (nodes.length > 0) {
                    this.nodesService.addNewNodes(nodes);
                    this.linksService.bindEntityWithGrade(gradeId, nodes[0].type);
                }
            })

            this.echartsInstance.setOption({
                series: [{
                    data: this.nodesService.getGraphNodes(),
                    links: this.linksService.getLinks()
                }]
            });
        });
    }

    public saveNewNode(newNode: INewNodeModel) {
        switch (newNode.type) {
            case 'role':
                this.nodesService.saveNewRole(newNode.name).subscribe(roleId => {
                    const newRenderNode = {
                        name: newNode.name,
                        type: newNode.type,
                        id: newNode.type + ':' + roleId,
                        ...nodeStyles[newNode.type],
                        parentId: this.selectedNode.id
                    };

                    this.nodesService.addNewNodes([newRenderNode]);
                    this.linksService.bindNewNodeWithParent(this.selectedNode.id, newRenderNode);
                    this.echartsInstance.setOption({
                        series: [{
                            data: this.nodesService.getGraphNodes(),
                            links: this.linksService.getLinks()
                        }]
                    });
                });
                break;
            case 'grade':
                const roleId = this.selectedNode.type === 'grade' ? this.selectedNode.parentId : this.selectedNode.id;
                const prevGradeId = this.selectedNode.type === 'grade' ? this.selectedNode.id : undefined;

                this.nodesService.saveNewGrade(newNode.name, roleId ? roleId : '', prevGradeId).subscribe(gradeId => {
                    const newRenderNode = {
                        name: newNode.name,
                        type: newNode.type,
                        id: newNode.type + ':' + gradeId,
                        ...nodeStyles[newNode.type],
                        parentId: roleId
                    };

                    this.nodesService.addNewNodes([newRenderNode]);
                    this.linksService.bindNewNodeWithParent(this.selectedNode.id, newRenderNode);
                    this.echartsInstance.setOption({
                        series: [{
                            data: this.nodesService.getGraphNodes(),
                            links: this.linksService.getLinks()
                        }]
                    });
                });
                break;
            case 'position':
                this.nodesService.saveNewPosition(newNode.name, this.selectedNode).subscribe(positionId => {
                    const newRenderNode = {
                        name: newNode.name,
                        type: newNode.type,
                        id: newNode.type + ':' + positionId,
                        ...nodeStyles[newNode.type],
                        parentId: this.selectedNode.id
                    };

                    this.nodesService.addNewNodes([newRenderNode]);
                    this.linksService.bindNewNodeWithParent(this.selectedNode.id, newRenderNode);
                    this.echartsInstance.setOption({
                        series: [{
                            data: this.nodesService.getGraphNodes(),
                            links: this.linksService.getLinks()
                        }]
                    });
                });
                break;
            case 'skill':
                this.nodesService.saveNewSkill(newNode.name, this.selectedNode).subscribe(skillId => {
                    const newRenderNode = {
                        name: newNode.name,
                        type: newNode.type,
                        id: newNode.type + ':' + skillId,
                        ...nodeStyles[newNode.type],
                        parentId: this.selectedNode.id
                    };

                    this.nodesService.addNewNodes([newRenderNode]);
                    this.linksService.bindNewNodeWithParent(this.selectedNode.id, newRenderNode);
                    this.echartsInstance.setOption({
                        series: [{
                            data: this.nodesService.getGraphNodes(),
                            links: this.linksService.getLinks()
                        }]
                    });
                });
                break;
            case 'duty':
                this.nodesService.saveNewDuty(newNode.name, 'чтобы работало', +this.selectedNode.id.split(':')[1])
                    .subscribe();
                break;
        }
    }

    public deleteNode(node: INode) {
        this.nodesService.deleteNode(this.selectedNode).subscribe(() => {
            this.nodesService.removeNodeFromGraph(node.id);
            this.echartsInstance.setOption({
                series: [{
                    data: this.nodesService.getGraphNodes(),
                    links: this.linksService.getLinks()
                }]
            });
        });
    }

    public showModalWithNotNodes(): void {
        this.sidebarVisible = false;
        this.modalVisible = true;
    }

    public onChartInit($event: ECharts) {
        this.echartsInstance = $event;
    }

    public ngOnDestroy() {
        this.nodesService.resetNodes();
    }
}
