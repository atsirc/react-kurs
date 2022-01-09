# Tests
about the tests: the different test file can not be run together because there is something in the creation of mock databses that creates conflicts between the files. I suspect it has something to do with async..
  
# Validation problems
mongoose-unique-validator caused problems when trying to user.save(), throwing an validation error for id. Finally googled it and found that it is a typical error https://github.com/blakehaswell/mongoose-unique-validator/issues/88
  
# Improvement suggestions to myself
* make a new test-file for tests with blogpost posting and deleting instead of using list_helper
* try to understand the beforeEach - function, because it seems to time out sometimes (maybe it could be fixed by added extra time for tests?)
* create a mock new user with id and passwordhash so i wouldnt have to repeat it inside of tests..
