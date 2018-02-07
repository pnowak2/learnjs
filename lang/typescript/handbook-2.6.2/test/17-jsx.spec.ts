import { expect } from 'chai';

describe('JSX', () => {
  describe('The as operator', () => {
    it('should use as instead of <> for casting, markup conflicts', () => {
      // var foo = bar as foo;
    });
  });

  describe('Type Checking', () => {
    it('should use lower case for value based elements like "div"', () => { });
    it('should use upper case for intrinsic elements like <MyComponent>', () => { });
  });

  describe('Intrinsic Elements', () => {
    it('should be specified in special interface"', () => {
      // declare namespace JSX {
      //   interface IntrinsicElements {
      //     foo: any
      //   }
      // }

      // <foo />; / / ok
      // < bar />; // error
    });
  });

  describe('Stateless Functional Component', () => {
    it('should be defined as JavaScript function where its first argument is a props object."', () => {
      // interface FooProp {
      //   name: string;
      //   X: number;
      //   Y: number;
      // }

      // declare function AnotherComponent(prop: {name: string});

      // function ComponentFoo(prop: FooProp) {
      //   return <AnotherComponent name=prop.name />;
      // }

      // const Button = (prop: {value: string}, context: { color: string }) => <button>
    });
  });

  describe('Class Component', () => {
    it('should be defined as class."', () => {
      class MyComponent {
        render() {}
      }
      
      // use a construct signature
      var myComponent = new MyComponent();
      
      // element class type => MyComponent
      // element instance type => { render: () => void }
      
      function MyFactoryFunction() {
        return {
          render: () => {
          }
        }
      }
      
      // use a call signature
      var myComponent = MyFactoryFunction();
      
      // element class type => FactoryFunction
      // element instance type => { render: () => void }
    });
  });
});
