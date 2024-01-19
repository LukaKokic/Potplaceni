--############################################ UNIT TEST 1; TESTING LOGIN FUNCTION ############################################
--testing existance of function
begin;
select plan(1);
select has_function(
	'api',
	'fn_login',
	ARRAY ['json'],
	'fn_login exists'
);
--testing is function written in plpgsql
begin;
select plan(1);
select function_lang_is(
	'api',
	'fn_login',
	ARRAY ['json'], 
	'plpgsql',
	'fn_login is written using plpgsql'
);
--testing if function returns json
begin;
select plan(1);
select function_returns(
	'api',
	'fn_login',
	'json',
	'This function is returning json'
);
--testing success invocation, testing for credentials that exist in DB
begin;
select plan(1);
select is(
	api.fn_login('{"username": "KB9012", "password": "a4942cc5"}'::json)->>'success',
	'true',
	'Correct credentials'
);
--testing failure invocation, testing for credentials that don't exist
begin;
select plan(1);
select is(
	api.fn_login('{"username": "KB9012", "password": "a4942"}'::json)->>'success',
	'false',
	'Wrong credentials'
);
--testing if no username and no password are providede, should fail
begin;
select plan(1);
select is(
	api.fn_login('{"username": "", "password": ""}'::json)->>'success',
	'false',
	'Wrong credentials'
-- );
select * from finish(true);
rollback;
--############################################ UNIT TEST 1; TESTING LOGIN FUNCTION ############################################

--################################################ UNIT TEST 2; TESTING ADDING ADMIN ##########################################
--testing existance of function
begin;
select plan(1);
select has_function(
	'api',
	'fn_add_admin',
	ARRAY ['json'],
	'fn_add_admin exists'
);
--testing is function written in plpgsql
begin;
select plan(1);
select function_lang_is(
	'api',
	'fn_add_admin',
	ARRAY ['json'], 
	'plpgsql',
	'fn_add_admin is written using plpgsql'
);
--testing if function returns json
begin;
select plan(1);
select function_returns(
	'api',
	'fn_add_admin',
	'json',
	'This function is returning json'
);
--testing success invocation, when adding new admin
begin;
select plan(2);
select is (api.fn_add_admin(
	'{
	  "PIN": "50125736",
	  "firstname": "Pero",
	  "lastname": "Perić",
	  "phone": "+3859173035",
	  "email": "pero.peric@gmail.com",
	  "roleList": [2]
	}'::json)->>'success',
	'true',
	'New admin has been created'
);
--testing failure invocation, when adding existing admin
select is (api.fn_add_admin(
	'{
	  "PIN": "50125736",
	  "firstname": "Pero",
	  "lastname": "Perić",
	  "phone": "+3859173035",
	  "email": "pero.peric@gmail.com",
	  "roleList": [2]
	}'::json)->>'success',
	'false',
	'Admin already exists'
);
--testing if roles are added to newly created admin
prepare new_assignedrole_entry as 
	select 
		*
	from
		assignedrole
	order by
		userid desc
	limit 1;
prepare expected_assignedrole_entry as select 29::bigint, 2::bigint;

select results_eq(
	'new_assignedrole_entry',
	'expected_assignedrole_entry',
	'Added new row to table assignedrole'
);

--testin if credentials are created for newly added admin
prepare new_credentials_entry as 
	select 
		*
	from
		auth.credentials
	order by
		userid desc
	limit 1;
	
prepare expected_credentials_entry as select 'PP5736'::varchar, left(MD5('50125736'), 8)::varchar, 30::bigint;

select results_eq(
	'new_credentials_entry',
	'expected_credentials_entry',
	'Added new row to table credentials'
);

select * from finish(true);
deallocate new_assignedrole_entry;
deallocate expected_assignedrole_entry;
deallocate new_credentials_entry;
deallocate expected_credentials_entry;
rollback;
--############################################ UNIT TEST 2; TESTING ADDING ADMIN #####################################

--########################################## UNIT TEST 3; TESTING DELETING ADMIN #####################################
--testing existance of function
begin;
select plan(1);
select has_function(
	'api',
	'fn_delete_admin',
	ARRAY ['json'],
	'fn_delete_admin exists'
);
--testing is function written in plpgsql
begin;
select plan(1);
select function_lang_is(
	'api',
	'fn_delete_admin',
	ARRAY ['json'], 
	'plpgsql',
	'fn_delete_admin is written using plpgsql'
);
--testing if function returns json
begin;
select plan(1);
select function_returns(
	'api',
	'fn_delete_admin',
	'json',
	'This function is returning json'
);
--testing deletion of a admin
begin;
select plan(4);
select is(
	api.fn_delete_admin('{"userID": 5}'::json)->>'success',
	'true',
	'Admin was deleted'
);
--testing if deleting nonexisting admin returns false
select is(
	api.fn_delete_admin('{"userID": 5}'::json)->>'success',
	'false',
	'Admin does not exist, can not delete'
);
--testing to see if data connected to deleted admin user is also deleted, such as credentials and assignedrole(s)
prepare deleted_admin_credentials as select count(*) from auth.credentials where userid = 5;
prepare zero_rows as select 0::bigint;

select results_eq(
	'deleted_admin_credentials',
	'zero_rows',
	'Admin credentials have been deleted'
);
prepare deleted_admin_roles as select count(*) from assignedrole where userid = 5;
prepare zero_role_rows as select 0::bigint;

select results_eq(
	'deleted_admin_roles',
	'zero_role_rows',
	'Admin role(s) have been deleted'
);
select * from finish(true);
deallocate deleted_admin_credentials;
deallocate zero_rows;
deallocate deleted_admin_roles;
deallocate zero_role_rows;
rollback;
--########################################## UNIT TEST 3; TESTING DELETING ADMIN #####################################

--#################################### UNIT TEST 4; TESTING ADDING ACCOMMODATION #####################################
--testing existance of function
begin;
select plan(1);
select has_function(
	'api',
	'fn_add_accommodation',
	ARRAY ['json'],
	'fn_add_accommodation exists'
);
--testing is function written in plpgsql
begin;
select plan(1);
select function_lang_is(
	'api',
	'fn_add_accommodation',
	ARRAY ['json'], 
	'plpgsql',
	'fn_add_accommodation is written using plpgsql'
);
--testing if function returns json
begin;
select plan(1);
select function_returns(
	'api',
	'fn_add_accommodation',
	'json',
	'This function is returning json'
);
--testing success invocation, when adding new accommodation
begin;
select plan(2);
select is (api.fn_add_accommodation(
	'{
	  "realEstateID": "IS-00141",
	  "typeID": 3,
	  "equippedID": 1,
	  "latitude": "45.083481",
	  "longitude": "13.648974",
	  "address": "Ljerke Šram 5",
	  "townID": 41,
	  "clinicID": 6,
	  "active": 1
	}'::json)->>'success',
	'true',
	'New accommodation has been created'
);
--testing failure invocation, when adding existing accommodation
select is (api.fn_add_accommodation(
	'{
	  "realEstateID": "IS-00141",
	  "typeID": 3,
	  "equippedID": 1,
	  "latitude": "45.083481",
	  "longitude": "13.648974",
	  "address": "Ljerke Šram 5",
	  "townID": 41,
	  "clinicID": 6,
	  "active": 1
	}'::json)->>'success',
	'false',
	'Accommodation alredy exists, can not create'
);
select * from finish(true);
rollback;
--#################################### UNIT TEST 4; TESTING ADDING ACCOMMODATION #####################################

--#################################### UNIT TEST 5; TESTING DELETING ACCOMMODATION ###################################
--testing existance of function
begin;
select plan(1);
select has_function(
	'api',
	'fn_delete_accommodation',
	ARRAY ['json'],
	'fn_delete_accommodation exists'
);
--testing is function written in plpgsql
begin;
select plan(1);
select function_lang_is(
	'api',
	'fn_delete_accommodation',
	ARRAY ['json'], 
	'plpgsql',
	'fn_delete_accommodation is written using plpgsql'
);
--testing if function returns json
begin;
select plan(1);
select function_returns(
	'api',
	'fn_delete_accommodation',
	'json',
	'This function is returning json'
);
--testing deletion of existing accommodation
begin;
select plan(2);
select is(
	api.fn_delete_accommodation('{"id": 140}'::json)->>'success',
	'true',
	'Accommodation was deleted'
);
--testing deletion of nonexisting accommodation
select is(
	api.fn_delete_accommodation('{"id": 140}'::json)->>'success',
	'false',
	'Can not delete something that does not exist'
);

select * from finish(true);
rollback;
--#################################### UNIT TEST 5; TESTING DELETING ACCOMMODATION ###################################

--############################### UNIT TEST 6; TESTING RETRIVAL OF LAST ACCOMMODATION ID##############################
--testing existance of function
begin;
select plan(1);
select has_function(
	'public',
	'fn_get_accommodation_last_id',
	'fn_get_accommodation_last_id exists'
);
--testing is function written in plpgsql
begin;
select plan(1);
select function_lang_is(
	'fn_get_accommodation_last_id',
	'plpgsql',
	'fn_get_accommodation_last_id is written using plpgsql'
);
--testing if function returns json
begin;
select plan(1);
select function_returns(
	'fn_get_accommodation_last_id',
	'json',
	'This function is returning json'
);
begin;
select plan(1);
select is(
	(public.fn_get_accommodation_last_id()->>'lastID')::varchar,
	'IS-00140'::varchar,
	'Got expected last id'
);
begin;
select plan(1);
select is(
	(public.fn_get_accommodation_last_id()->>'lastID')::varchar,
	'IS-10004'::varchar,
	'Got expected last id'
);
select * from finish()
rollback;
--############################### UNIT TEST 6; TESTING RETRIVAL OF LAST ACCOMMODATION ID##############################