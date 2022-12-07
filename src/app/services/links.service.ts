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
  }, {
    source: 'Node 1',
    target: 'Node 16'
  }, {
    source: 'Node 16',
    target: 'Node 17'
  }, {
    source: 'Node 17',
    target: 'Node 18'
  }, {
    source: 'Node 18',
    target: 'Node 19'
  }, {
    source: 'Node 17',
    target: 'Node 20'
  }, {
    source: 'Node 17',
    target: 'Node 21'
  }, {
    source: 'Node 17',
    target: 'Node 22'
  }, {
    source: 'Node 17',
    target: 'Node 23'
  }, {
    source: 'Node 17',
    target: 'Node 24'
  }, {
    source: 'Node 18',
    target: 'Node 25'
  }, {
    source: 'Node 18',
    target: 'Node 26'
  }, {
    source: 'Node 18',
    target: 'Node 27'
  }, {
    source: 'Node 18',
    target: 'Node 28'
  }, {
    source: 'Node 18',
    target: 'Node 29'
  }, {
    source: 'Node 19',
    target: 'Node 30'
  }, {
    source: 'Node 19',
    target: 'Node 31'
  }, {
    source: 'Node 19',
    target: 'Node 32'
  }, {
    source: 'Node 19',
    target: 'Node 33'
  }, {
    source: 'Node 19',
    target: 'Node 34'
  }, {
    source: 'Node 17',
    target: 'Node 35'
  }, {
    source: 'Node 17',
    target: 'Node 36'
  }, {
    source: 'Node 17',
    target: 'Node 37'
  }, {
    source: 'Node 18',
    target: 'Node 38'
  }, {
    source: 'Node 18',
    target: 'Node 39'
  }, {
    source: 'Node 18',
    target: 'Node 40'
  }, {
    source: 'Node 19',
    target: 'Node 41'
  }, {
    source: 'Node 19',
    target: 'Node 42'
  }, {
    source: 'Node 19',
    target: 'Node 43'
  }, {
    source: 'Node 6',
    target: 'Node 44'
  }, {
    source: 'Node 44',
    target: 'Node 45'
  }, {
    source: 'Node 45',
    target: 'Node 46'
  }, {
    source: 'Node 44',
    target: 'Node 47'
  }, {
    source: 'Node 44',
    target: 'Node 48'
  }, {
    source: 'Node 44',
    target: 'Node 49'
  }, {
    source: 'Node 44',
    target: 'Node 50'
  }, {
    source: 'Node 44',
    target: 'Node 51'
  }, {
    source: 'Node 45',
    target: 'Node 52'
  }, {
    source: 'Node 45',
    target: 'Node 53'
  }, {
    source: 'Node 45',
    target: 'Node 54'
  }, {
    source: 'Node 45',
    target: 'Node 55'
  }, {
    source: 'Node 45',
    target: 'Node 56'
  }, {
    source: 'Node 46',
    target: 'Node 57'
  }, {
    source: 'Node 46',
    target: 'Node 58'
  }, {
    source: 'Node 46',
    target: 'Node 59'
  }, {
    source: 'Node 46',
    target: 'Node 60'
  }, {
    source: 'Node 46',
    target: 'Node 61'
  }, {
    source: 'Node 44',
    target: 'Node 62'
  }, {
    source: 'Node 44',
    target: 'Node 63'
  }, {
    source: 'Node 44',
    target: 'Node 64'
  }, {
    source: 'Node 45',
    target: 'Node 65'
  }, {
    source: 'Node 45',
    target: 'Node 66'
  }, {
    source: 'Node 45',
    target: 'Node 67'
  }, {
    source: 'Node 46',
    target: 'Node 68'
  }, {
    source: 'Node 46',
    target: 'Node 69'
  }, {
    source: 'Node 46',
    target: 'Node 70'
  }, {
    source: 'Node 1',
    target: 'Node 71'
  }, {
    source: 'Node 71',
    target: 'Node 72'
  }, {
    source: 'Node 72',
    target: 'Node 73'
  }, {
    source: 'Node 73',
    target: 'Node 74'
  }, {
    source: 'Node 72',
    target: 'Node 75'
  }, {
    source: 'Node 72',
    target: 'Node 76'
  }, {
    source: 'Node 72',
    target: 'Node 77'
  }, {
    source: 'Node 72',
    target: 'Node 78'
  }, {
    source: 'Node 72',
    target: 'Node 79'
  }, {
    source: 'Node 73',
    target: 'Node 80'
  }, {
    source: 'Node 73',
    target: 'Node 81'
  }, {
    source: 'Node 73',
    target: 'Node 82'
  }, {
    source: 'Node 73',
    target: 'Node 83'
  }, {
    source: 'Node 73',
    target: 'Node 84'
  }, {
    source: 'Node 74',
    target: 'Node 85'
  }, {
    source: 'Node 74',
    target: 'Node 86'
  }, {
    source: 'Node 74',
    target: 'Node 87'
  }, {
    source: 'Node 74',
    target: 'Node 88'
  }, {
    source: 'Node 74',
    target: 'Node 89'
  }, {
    source: 'Node 72',
    target: 'Node 90'
  }, {
    source: 'Node 72',
    target: 'Node 91'
  }, {
    source: 'Node 72',
    target: 'Node 92'
  }, {
    source: 'Node 73',
    target: 'Node 93'
  }, {
    source: 'Node 73',
    target: 'Node 94'
  }, {
    source: 'Node 73',
    target: 'Node 95'
  }, {
    source: 'Node 74',
    target: 'Node 96'
  }, {
    source: 'Node 74',
    target: 'Node 97'
  }, {
    source: 'Node 74',
    target: 'Node 98'
  }, {
    source: 'Node 1',
    target: 'Node 99'
  }, {
    source: 'Node 99',
    target: 'Node 100'
  }, {
    source: 'Node 100',
    target: 'Node 101'
  }, {
    source: 'Node 101',
    target: 'Node 102'
  }, {
    source: 'Node 100',
    target: 'Node 103'
  }, {
    source: 'Node 100',
    target: 'Node 104'
  }, {
    source: 'Node 100',
    target: 'Node 105'
  }, {
    source: 'Node 100',
    target: 'Node 106'
  }, {
    source: 'Node 100',
    target: 'Node 107'
  }, {
    source: 'Node 101',
    target: 'Node 108'
  }, {
    source: 'Node 101',
    target: 'Node 109'
  }, {
    source: 'Node 101',
    target: 'Node 110'
  }, {
    source: 'Node 101',
    target: 'Node 111'
  }, {
    source: 'Node 101',
    target: 'Node 112'
  }, {
    source: 'Node 102',
    target: 'Node 113'
  }, {
    source: 'Node 102',
    target: 'Node 114'
  }, {
    source: 'Node 102',
    target: 'Node 115'
  }, {
    source: 'Node 102',
    target: 'Node 116'
  }, {
    source: 'Node 102',
    target: 'Node 117'
  }, {
    source: 'Node 100',
    target: 'Node 118'
  }, {
    source: 'Node 100',
    target: 'Node 119'
  }, {
    source: 'Node 100',
    target: 'Node 120'
  }, {
    source: 'Node 101',
    target: 'Node 121'
  }, {
    source: 'Node 101',
    target: 'Node 122'
  }, {
    source: 'Node 101',
    target: 'Node 123'
  }, {
    source: 'Node 102',
    target: 'Node 124'
  }, {
    source: 'Node 102',
    target: 'Node 125'
  }, {
    source: 'Node 102',
    target: 'Node 126'
  },];

  getLinks() {
    return this.links;
  }
}
