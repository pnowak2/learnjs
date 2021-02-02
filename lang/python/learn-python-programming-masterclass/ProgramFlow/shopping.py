shopping_list = ["milk", "spam", "pasta"]

for item in shopping_list:
    if item != "spam":
        print("Buy {}".format(item))

for item in shopping_list:
    if item == "spam":
        continue
    print("buy {}".format(item))

for item in shopping_list:
    if item == "spam":
        break
    print("buy {}".format(item))
