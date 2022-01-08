# Tests
about the tests: they can mostly not be run together because there is something in the creation of mock databses that creates conflicts
  
# Validation problems
mongoose-unique-validator caused problems when trying to user.save(), throwing an validation error for _id. Finally googled it and found that it is a typical error https://github.com/blakehaswell/mongoose-unique-validator/issues/88
