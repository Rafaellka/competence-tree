import { Injectable } from '@angular/core';
import { ILink } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  links: ILink[] = [{
    source: 'Node 1',
    target: 'Node 2'
  }, {
    source: 'Node 2',
    target: 'Node 3'
  }, {
    source: 'Node 3',
    target: 'Node 4'
  }, {
    source: 'Node 4',
    target: 'Node 5'
  }, {
    source: 'Node 1',
    target: 'Node 6'
  }, {
    source: 'Node 3',
    target: 'Node 9'
  }, {
    source: 'Node 3',
    target: 'Node 10'
  }, {
    source: 'Node 3',
    target: 'Node 7'
  }, {
    source: 'Node 4',
    target: 'Node 8'
  }, {
    source: 'Node 5',
    target: 'Node 11'
  }, {
    source: 'Node 3',
    target: 'Node 12'
  }, {
    source: 'Node 4',
    target: 'Node 13'
  }, {
    source: 'Node 4',
    target: 'Node 14'
  }, {
    source: 'Node 5',
    target: 'Node 15'
  }];

  getLinks() {
    return this.links;
  }
}
