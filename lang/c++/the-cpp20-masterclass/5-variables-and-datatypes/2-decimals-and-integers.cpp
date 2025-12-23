#include <iostream>
#include <cassert>

int main() {
  int elephant_count;

  int lion_count{}; // init to zero

  int dog_count{10}; // init
  int dog_count2(10); // functional init

  assert(dog_count == dog_count2);

  int cat_count{15};
  int cat_count2(15);

  assert(cat_count == cat_count2);

  int domesticated_count {dog_count + cat_count};

  int narrowing_conversion(2.9);
  assert(narrowing_conversion == 2);
}