INSERT INTO public.adminuser(
	pin, firstname, lastname, phone, email)
	VALUES ('12345678', 'John', 'Doe', '+1234567890', 'john.doe@example.com'),
	('98765432', 'Alice', 'Smith', '+9876543210', 'alice.smith@example.com'),
	('23456789', 'Bob', 'Johnson', '+2345678901', 'bob.johnson@example.com'),
	('34567890', 'Eva', 'Brown', '+3456789012', 'eva.brown@example.com'),
	('45678901', 'Michael', 'Williams', '+4567890123', 'michael.williams@example.com'),
	('56789012', 'Karlo', 'Baljak', '+7890123456', 'kb53813@fer.hr');
	
	
INSERT INTO auth.credentials(
	username, pass, userid)
	select
		left(firstname, 1) || left(lastname, 1) || right(pin::varchar,4) as username,
		left(MD5(pin::varchar), 8) as pass,
		userid
	from public.adminuser;
	
