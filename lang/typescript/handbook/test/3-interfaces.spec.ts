import { expect } from 'chai';

describe('Interfaces', () => {
  describe('First Interface', () => {
    it('Use without Interface', () => {
      function printLabel(labeledObj: { label: string }) {
        return `printed ${labeledObj.label}`;
      }

      let result = printLabel({
        label: 'test'
      });

      expect(result).to.eql('printed test');
    });

    it('Done with using Interface', () => {
      interface LabelledValue {
        label: string
      }

      function printLabel(labeledObj: LabelledValue) {
        return `printed ${labeledObj.label}`;
      }

      let result = printLabel({
        label: 'document'
      });

      expect(result).to.eql('printed document');
    });
  });
});