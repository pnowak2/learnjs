describe('Basic Types', () => {
  describe('Boolean', () => {
    it('should declare it', () => {
      function POST(value: string) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          var originalMethod = descriptor.value;
            descriptor.value = function() {
              const res = originalMethod.apply(undefined);
              return `http call to: ${value}, ${res}`;
            }

            return descriptor;
        };
    }

      function f() {
        return function(target: any) {
          target.boo = 'hej';
        }
      }

      @f()
      class Person {
        @POST('/api')
        getAll() {
          return 'orig';
        }
      }

      const p = new Person();
      expect(p.getAll()).toEqual('http call to: /api, orig');

    });
  })
});