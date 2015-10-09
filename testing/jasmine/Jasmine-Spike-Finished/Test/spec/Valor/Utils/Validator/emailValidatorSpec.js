
describe('Email Validator Function', function() {
	it('should be defined in namespace', function() {
		expect(Valor.Utils.Validator.Email).toBeDefined();
	});

	it('should be a function', function() {
		expect(Valor.Utils.Validator.Email).toEqual(jasmine.any(Function));
	});
});

describe('Validator features', function() {

	var emailValidator;

	beforeEach(function () {
		emailValidator = new Valor.Utils.Validator.Email;
	});

	describe('Email Validator object', function() {

		it('should be created', function() {
			expect(emailValidator).toBeDefined();
		});

		it('should have validate method', function() {
			expect(emailValidator.validate).toEqual(jasmine.any(Function));
		});

	});

	describe('Email Validator results object', function() {

		it('should return validation result', function() {
			expect(emailValidator.validate("")).toBeDefined();
		});

		it('should have isValid boolean property', function() {
			var result = emailValidator.validate("");
			expect(result.isValid).toEqual(jasmine.any(Boolean));
		});

	});

	describe('Email validation', function() {
		it('should validate proper emails', function() {
			var validEmails = [
				"john.smith@valor.eu",
				"a@b.be",
				"1@1.eu"
			];

			for (var email in validEmails) {
				var result = emailValidator.validate(validEmails[email]);
				expect(result.isValid).toBeTruthy();
			}

		});

		it('should not pass wrong emails', function() {
			var invalidEmails = [
				"john.smithvalor.eu",
				"a@b.b",
				"1@1.2"
			];

			for (var email in invalidEmails) {
				var result = emailValidator.validate(invalidEmails[email]);
				expect(result.isValid).toBeFalsy();
			}
		});

		it('should expect email argument', function() {
			expect(function () {
				emailValidator.validate();
			}).toThrow("No email provided");
		});

		it('should accept only strings', function() {
			expect(function(){
				emailValidator.validate(2);
			}).toThrow("The email should be string");
		});
	});	
});


