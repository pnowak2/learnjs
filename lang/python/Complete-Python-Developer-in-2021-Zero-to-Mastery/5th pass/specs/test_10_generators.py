
class TestGenerators:
    def test_sequential_concept(self):
      def make_list(n):
         result = []
         for i in range(n):
            result.append(i)

         return result

      result = make_list(5)

      assert(result == [0, 1, 2, 3, 4])
      # taking up space in memory
      # range is a generator, does not fill memory, just gives sequential values

    def test_generator_with_yield_and_next(self):
      def generator_fn():
            yield 0 # pause function, give value and wait what to do next
            yield 1 # pause function, give value and wait what to do next
            yield 2 # pause function, give value and wait what to do next

      gen = generator_fn()

      try:
        assert(next(gen) == 0)
        assert(next(gen) == 1)
        assert(next(gen) == 2)

        next(gen)

        assert False

      except StopIteration as err:
         assert True

    def test_iterate_with_generator(self):
      def generator_fn(n):
         for i in range(n):
            yield i

      result = [item for item in generator_fn(3)]

      assert(result == [0, 1, 2])

    def test_iter(self):
       itr = iter([1, 2, 3])

       assert(next(itr) == 1)
       assert(next(itr) == 2)
       assert(next(itr) == 3)

    def test_custom_generator(self):
      class MyRange:
        def __init__(self, frm ,to):
           self.frm = frm
           self.to = to

           self.current = frm

        def __iter__(self):
           return self

        def __next__(self):
           if(self.current < self.to):
              item = self.current
              self.current += 1

              return item
           else:
              raise StopIteration

      myRange = MyRange(1, 3)
      assert(next(myRange) == 1)
      assert(next(myRange) == 2)

      try:
        assert(next(myRange) == 3)
        assert False
      except StopIteration:
        assert True

         