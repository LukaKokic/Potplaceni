CREATE OR REPLACE FUNCTION api.fn_add_accommodation(IN accommodation_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Accommodation already exists"}';
	acc_REID varchar := (accommodation_data->>'realEstateID')::varchar;
	type_ID smallint := (accommodation_data->>'typeID')::smallint;
	equipped_ID smallint := (accommodation_data->>'equippedID')::smallint;
	lat decimal(9,6) := (accommodation_data->>'latitude')::decimal(9,6);
	long decimal(9,6) := (accommodation_data->>'longitude')::decimal(9,6);
	addr varchar := (accommodation_data->>'address')::varchar;
	town_ID integer := (accommodation_data->>'townID')::integer;
	clinic_ID integer := (accommodation_data->>'clinicID')::integer;
	ac bit := (accommodation_data->>'active')::bit;
	
begin
	if (select count (*) from public.accommodation where realestateid = acc_REID) = 0 then
		insert into public.accommodation (realestateid, typeid, equippedid, latitude, longitude, address, townid, clinicid, active)
		values (acc_REID, type_ID, equipped_ID, lat, long, addr, town_ID, clinic_ID, ac);
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'Accommodation created'
		);
	end if;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_add_accommodation(json)
    OWNER TO dentall_rmm2_user;
-- FUNCTION: api.fn_add_admin(json)

-- DROP FUNCTION IF EXISTS api.fn_add_admin(json);

CREATE OR REPLACE FUNCTION api.fn_add_admin(
	new_admin_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	admin_pin integer := (new_admin_data->>'PIN')::integer;
	f_name varchar := (new_admin_data->>'firstname')::varchar;
	l_name varchar := (new_admin_data->>'lastname')::varchar;
	ph varchar := (new_admin_data->>'phone')::varchar;
	mail varchar := (new_admin_data->>'email')::varchar;
	rL_array integer[];
	new_userid integer;
	
begin
	select array(
		select json_array_elements_text(new_admin_data->'roleList')::integer
	) into rL_array;
	
	if (select count(*) from public.adminuser au where au.pin = admin_pin) = 0 then
		insert into public.adminuser (pin, firstname, lastname, phone, email)
		values (admin_pin, f_name, l_name, ph, mail);
		
		select 
			userid
		into
			new_userid
		from
			public.adminuser
		order by
			userid desc
		limit 1;
			
		perform public.fn_assign_new_roles(rL_array, new_userid);
		
		perform public.fn_create_credentials();
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'New admin created'
		);
	end if;
	if returnValue is null then	
		returnValue := json_build_object(
			'success', false,
			'msg', 'Could not create user'
		);
	end if;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_add_admin(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO postgres;


CREATE FUNCTION public.fn_assign_new_roles(IN role_list integer[], IN user_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	rID integer;
begin
	if (select count (*) from public.assignedrole where userid = user_id) != 0 then
		delete from public.assignedrole where userid = user_id;
	end if;
	foreach rID in array role_list
	LOOP
		insert into public.assignedrole (userid, roleid) values(user_id, rID);
	end LOOP;
end;
$BODY$;

ALTER FUNCTION public.fn_assign_new_roles(integer[], integer)
    OWNER TO dentall_rmm2_user;
-- FUNCTION: api.fn_add_transporter_vehicle(json)

-- DROP FUNCTION IF EXISTS api.fn_add_transporter_vehicle(json);

CREATE OR REPLACE FUNCTION api.fn_add_transporter_vehicle(
	new_vehicle_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Could not add transporter vehicle"}'::json;
	reg varchar := (new_vehicle_data->>'registration')::varchar;
	cap smallint := (new_vehicle_data->>'capacity')::smallint;
	type_id smallint := (new_vehicle_data->>'type')::smallint;
	vehicle_brand varchar := (new_vehicle_data->>'brand')::varchar;
	brand_model varchar := (new_vehicle_data->>'model')::varchar;
	trans_id integer := (new_vehicle_data->>'transporter_id')::integer;
	acc bit := (new_vehicle_data->>'active')::bit;
	l_vid integer;
	
begin
	if (select count(*) from public.vehicle where registration = reg) = 0 then
		INSERT INTO public.vehicle (registration, capacity, typeid, brand, model, transporterid, active)
		VALUES (reg, cap, type_id, vehicle_brand, brand_model, trans_id, acc)
		returning vehicleid into l_vid;
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'Vehicle added'
		);
		
		perform public.fn_create_schedule(l_vid);
	end if;
	
	return returnValue;
end
$BODY$;

ALTER FUNCTION api.fn_add_transporter_vehicle(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO dentall_rmm2_user;


-- FUNCTION: api.fn_add_patient(json)

-- DROP FUNCTION IF EXISTS api.fn_add_patient(json);

CREATE OR REPLACE FUNCTION api.fn_add_patient(
	patient_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Patient could not be created"}'::json;
	patient_id integer;
	pin_in integer := (patient_in->>'pin')::integer;
	f_name varchar := (patient_in->>'firstname')::varchar;
	l_name varchar := (patient_in->>'lastname')::varchar;
	ph varchar := (patient_in->>'phone')::varchar;
	mail varchar := (patient_in->>'mail')::varchar;
	home_addr varchar := (patient_in->>'homeAddress')::varchar;
	acc_type_id integer := (patient_in->>'typePref')::integer;
	eq_type_id integer := (patient_in->>'equippedPref')::integer;
	treatment_id integer := (patient_in->>'treatmentID')::integer;
	treatment_date_from date := (patient_in->>'from')::date;
	treatment_date_till date := (patient_in->>'till')::date;
	clinic_id integer := (patient_in->>'clinicID')::integer;
	
begin
	if (select count(*) from public.patient where pin = pin_in) then
		return returnValue;
	end if;
	
	INSERT INTO public.patient (pin, firstname, lastname, phone, email, residenceaddress)
	VALUES (pin_in, f_name, l_name, ph, mail, home_addr)
	returning patientid into patient_id;

	
	INSERT INTO public.patientpreferences (patientid, typeid, equippedid)
	VALUES (patient_id, acc_type_id, eq_type_id);
	
	INSERT INTO public.assigned (treatmentid, patientid, datefrom, dateto)
	VALUES (treatment_id, patient_id, treatment_date_from, treatment_date_till);
	
	INSERT INTO public.patientplan (treatmentid, clinicid, patientid)
	VALUES (treatment_id, clinic_id, patient_id);
	
	perform public.fn_create_patient_accommodation_plan(patient_id);
	perform public.fn_create_patient_transportation_plan(patient_id);
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Patient added',
		'id', patient_id
	);
	
	return returnValue;
	
end
$BODY$;

ALTER FUNCTION api.fn_add_patient(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_add_patient(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_add_patient(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_add_patient(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_add_patient(json) TO dentall_rmm2_user;


-- FUNCTION: api.fn_add_transporter(json)

-- DROP FUNCTION IF EXISTS api.fn_add_transporter(json);

CREATE OR REPLACE FUNCTION api.fn_add_transporter(
	data_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json := '{"success": false, "msg":"Transporter could not be created"}';
	org_name varchar := (data_in->>'orgName')::varchar;
	contact varchar := (data_in->>'contact')::varchar;
	mail varchar := (data_in->>'email')::varchar;
	addr varchar := (data_in->>'address')::varchar;
	town integer := (data_in->>'townID')::integer;
	ac bit := (data_in->>'active')::bit;
	
	org_code varchar;

begin
	select into org_code
		'ORG-' || left(MD5(org_name),6);

	if (select count(*) from public.transporter where orgcode = org_code) = 0 then			
		INSERT INTO public.transporter (orgcode, organisationname, phone, address, townid, email, active)
		VALUES (org_code, org_name, contact, addr, town, mail, ac);
	
		returnValue := json_build_object(
			'success', true,
			'msg', 'Transported created'
		);
	end if;
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_add_transporter(json)
    OWNER TO dentall_rmm2_user;

CREATE OR REPLACE FUNCTION api.fn_change_password(IN data_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	user_ID integer := (data_in->>'userID')::integer;
	new_pass varchar := (data_in->>'pass')::varchar;
	returnValue json := json_build_object(
		'success', false,
		'msg', 'Could not change password'
	);
begin
	update 
		auth.credentials
	set
		pass = left(MD5(new_pass), 8)
	where
		userid = user_ID;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Password has been changed'
	);
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_change_password(json)
    OWNER TO dentall_rmm2_user;
-- FUNCTION: public.fn_create_patient_accommodation_plan(integer)

-- DROP FUNCTION IF EXISTS public.fn_create_patient_accommodation_plan(integer);

CREATE OR REPLACE FUNCTION public.fn_create_patient_accommodation_plan(
	patient_id integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

declare
	returnValue json;	
	rows_inserted integer;
	
begin
	INSERT INTO public.accommodationoccupied(
		patientid, accommodationid, datefrom, dateto)
	select
		pp.patientid,
		acc.accommodationid,
		a.datefrom,
		a.dateto
	from
		patientplan pp
	join
		assigned a
	on pp.patientid = a.patientid
	and	pp.treatmentid = a.treatmentid
	join
		patientpreferences ppref
	on	pp.patientid = ppref.patientid
	inner join
		accommodation acc
	on	acc.typeid = ppref.typeid
	and	acc.equippedid = ppref.equippedid
	and acc.clinicid = pp.clinicid
	left join
		accommodationoccupied accocu
	on	accocu.accommodationid = acc.accommodationid
	and	daterange(a.datefrom, a.dateto) && daterange(accocu.datefrom, accocu.dateto)
	where pp.patientid = patient_id
	and	accocu.accommodationid is null
	limit 1;
		
	get diagnostics rows_inserted = row_count;
	if (rows_inserted = 0) then
		returnValue := '{"msg": "No accommodation found, plan canceled"}'::json;
		return returnValue;
	end if;
	
	returnValue := '{"msg": "Added to accommodationoccupied"}'::json;
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_create_patient_accommodation_plan(integer)
    OWNER TO dentall_rmm2_user;

-- FUNCTION: public.fn_create_patient_transportation_plan(integer)

-- DROP FUNCTION IF EXISTS public.fn_create_patient_transportation_plan(integer);

CREATE OR REPLACE FUNCTION public.fn_create_patient_transportation_plan(
	patient_id integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

declare
	returnValue json;	
	rows_inserted integer;
	
begin
--dolazak
	with
		cte_assigned as (
			select
				pp.*,
				a.datefrom,
				a.dateto,
				c.townid
			from
				patientplan pp
			join
				assigned a
			on pp.patientid = a.patientid
			and	pp.treatmentid = a.treatmentid
			join
				clinic c
			on	pp.clinicid = c.clinicid
			
			where
				pp.patientid = 8
		)
		, cte_schedule as (
			select
				patientid,
				extract(dow from dan) dow,
				dan
			from (
				select 
					patientid,
					generate_series(datefrom, dateto, '1 DAY'::interval) dan
				from
					cte_assigned
			) s
		)

	INSERT INTO public.vehicleoccupied(
		patientid, vehicleid, timestart, timeend)
	select distinct on (ctass.patientid, ctsch.dan)
		ctass.patientid,
		v.vehicleid, 
		ctsch.dan + '07:00:00'::interval,
		ctsch.dan + '07:30:00'::interval
	from
		cte_assigned ctass
	inner join
		transporter tr
	on	ctass.townid = tr.townid
	inner join
		vehicle v
	on v.transporterid = tr.transporterid
	inner join
		cte_schedule ctsch
	on	ctass.patientid = ctsch.patientid
	inner join
		vehicleschedule vsch
	on	v.vehicleid = vsch.vehicleid
	and	vsch.dow = ctsch.dow
	and	'07:30:00'::time between vsch.timestart and vsch.timeend
	left join
		vehicleoccupied vocc
	on	v.vehicleid = vocc.vehicleid
	and	tstzrange(ctsch.dan + '07:00:00'::interval, ctsch.dan + '07:30:00'::interval) && tstzrange(vocc.timestart, vocc.timeend)
	where v.active = 1::bit
	and	vocc.vehicleid is null;
-- odlazak
with
		cte_assigned as (
			select
				pp.*,
				a.datefrom,
				a.dateto,
				c.townid
			from
				patientplan pp
			join
				assigned a
			on pp.patientid = a.patientid
			and	pp.treatmentid = a.treatmentid
			join
				clinic c
			on	pp.clinicid = c.clinicid
			
			where
				pp.patientid = 8
		)
		, cte_schedule as (
			select
				patientid,
				extract(dow from dan) dow,
				dan
			from (
				select 
					patientid,
					generate_series(datefrom, dateto, '1 DAY'::interval) dan
				from
					cte_assigned
			) s
		)

	INSERT INTO public.vehicleoccupied(
		patientid, vehicleid, timestart, timeend)
	select distinct on (ctass.patientid, ctsch.dan)
		ctass.patientid,
		v.vehicleid, 
		ctsch.dan + '16:00:00'::interval,
		ctsch.dan + '16:30:00'::interval
	from
		cte_assigned ctass
	inner join
		transporter tr
	on	ctass.townid = tr.townid
	inner join
		vehicle v
	on v.transporterid = tr.transporterid
	inner join
		cte_schedule ctsch
	on	ctass.patientid = ctsch.patientid
	inner join
		vehicleschedule vsch
	on	v.vehicleid = vsch.vehicleid
	and	vsch.dow = ctsch.dow
	and	'16:00:00'::time between vsch.timestart and vsch.timeend
	left join
		vehicleoccupied vocc
	on	v.vehicleid = vocc.vehicleid
	and	tstzrange(ctsch.dan + '16:00:00'::interval, ctsch.dan + '16:30:00'::interval) && tstzrange(vocc.timestart, vocc.timeend)
	where v.active = 1::bit
	and	vocc.vehicleid is null;
	
		
	get diagnostics rows_inserted = row_count;
	if (rows_inserted = 0) then
		returnValue := '{"msg": "No transportation found, walk!"}'::json;
		return returnValue;
	end if;
	
	returnValue := '{"msg": "Added to table vehicleoccupied"}'::json;
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_create_patient_transportation_plan(integer)
    OWNER TO dentall_rmm2_user;

-- FUNCTION: public.fn_create_schedule()

-- DROP FUNCTION IF EXISTS public.fn_create_schedule();

CREATE OR REPLACE FUNCTION public.fn_create_schedule(p_vid integer
	)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	dow integer;
	time_start time;
	time_end time;
	shift_break time;
	working_days integer[];
	i integer;
	
begin
	select 
		array_agg(dayOfWeek order by random())
	into
		working_days
	from (
    	select 
			dayOfWeek
    	from 
			generate_series(0, 6) AS dayOfWeek
    	order by 
			random()
    	LIMIT 5
	) AS subquery;
	
	FOR i IN 1..array_length(working_days, 1) LOOP
		dow := working_days[i];
		time_start = '00:00'::interval;
		time_end = '00:00'::interval;
		shift_break = '00:00'::interval;
		for j IN 1..2 LOOP
			if j = 1 then
				time_start := (RANDOM()*(10-6) + 6)::integer * '1 HOUR'::interval;
				time_end := time_start + '06:00'::interval;
				shift_break := time_end + '01:00'::interval;
			end if;
			if j != 1 then
				time_start := shift_break;
				time_end := time_start + '06:00'::interval;
				shift_break := time_end + '01:00'::interval;
			end if;
			INSERT INTO vehicleschedule(vehicleid, dow, timestart, timeend)
			VALUES (p_vid, dow, time_start::time, time_end::time);
		END LOOP;
	END LOOP;
end
	
$BODY$;

ALTER FUNCTION public.fn_create_schedule(integer)
    OWNER TO dentall_rmm2_user;

CREATE FUNCTION public."fn_create_credentials"()
    RETURNS void
    LANGUAGE 'plpgsql'
    
AS $BODY$
begin
	insert into auth.credentials(
		username, pass, userid)
	select
		left(firstname, 1) || left(lastname, 1) || right(pin::varchar, 4) username,
		left(MD5(pin::varchar), 8) pass,
		userid
	from
		public.adminuser
	order by userid desc
	limit 1;
end;
$BODY$;

ALTER FUNCTION public."fn_create_credentials"()
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION public."fn_create_credentials"() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public."fn_create_credentials"() TO app_api;

GRANT EXECUTE ON FUNCTION public."fn_create_credentials"() TO auth_api;

GRANT EXECUTE ON FUNCTION public."fn_create_credentials"() TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION public."fn_create_credentials"() TO postgres;
CREATE OR REPLACE FUNCTION api.fn_delete_accommodation(IN delete_acc json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json:= json_build_object(
			'success', true,
			'msg', 'Accommodation deleted'
		);
	acc_id integer := (delete_acc->>'id')::integer;

begin
	if (select count(*) from public.accommodation where accommodationid = acc_id) = 0 then
		returnValue := json_build_object(
			'success', false,
			'msg', 'Accommodation could not be deleted'
		);
		return returnValue;
	end if;

	delete from public.accommodation where accommodationid = acc_id;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_delete_accommodation(json)
    OWNER TO dentall_rmm2_user;
CREATE OR REPLACE FUNCTION api.fn_delete_admin(IN data_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json:= json_build_object(
			'success', true,
			'msg', 'Admin deleted'
		);

begin
	if (select count(*) from public.adminuser where userid = (data_in->>'userID')::integer) = 0 then
		returnValue := json_build_object(
			'success', false,
			'msg', 'Admin could not be deleted'
		);
	end if;

	delete from public.adminuser where userid = (data_in->>'userID')::integer;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_delete_admin(json)
    OWNER TO dentall_rmm2_user;
-- FUNCTION: api.fn_delete_patient(json)

-- DROP FUNCTION IF EXISTS api.fn_delete_patient(json);

CREATE OR REPLACE FUNCTION api.fn_delete_patient(
	delete_patient json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Could not delete patient"}'::json;
	delete_patient_id integer := (delete_patient->>'id')::integer;
	
begin
	if (select count(*) from public.patient where patientid = delete_patient_id) = 0 then
		return returnValue;
	end if;
	
	delete from public.patient where patientid = delete_patient_id;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Patient deleted'
	);
	
	return returnValue;
end
	
$BODY$;

ALTER FUNCTION api.fn_delete_patient(json)
    OWNER TO dentall_rmm2_user;

CREATE OR REPLACE FUNCTION api.fn_delete_transporter(IN delete_trans json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Could not delete"}'::json;
	trans_id integer := (delete_trans->>'id')::integer;
	
begin
	if (select count(*) from public.transporter where transporterid = trans_id) = 0 then
		return returnValue;
	end if;
	
	delete from public.transporter where transporterid = trans_id;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Transporter deleted'
	);
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_delete_transporter(json)
    OWNER TO dentall_rmm2_user;
CREATE OR REPLACE FUNCTION api.fn_delete_transporter_vehicle(IN delete_vehicle json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Could not delete"}'::json;
	vehicle_id integer := (delete_vehicle->>'id')::integer;
	
begin
	if (select count(*) from public.vehicle where vehicleid = vehicle_id) = 0 then
		return returnValue;
	end if;
	
	delete from public.vehicle where vehicleid = vehicle_id;
	delete from public.vehicleschedule where vehicleid = vehicle_id;
	returnValue := json_build_object(
		'success', true,
		'msg', 'Vehicle deleted'
	);
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_delete_transporter_vehicle(json)
    OWNER TO dentall_rmm2_user;
-- FUNCTION: public.fn_get_accommodation_last_id()

-- DROP FUNCTION IF EXISTS public.fn_get_accommodation_last_id();

CREATE OR REPLACE FUNCTION public.fn_get_accommodation_last_id(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_build_object(
			'lastID', realestateid
		)
	from
		accommodation
	order by
		accommodationid desc
	limit 1;
	
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_get_accommodation_last_id()
    OWNER TO dentall_rmm2_user;

CREATE OR REPLACE FUNCTION public.fn_get_accommodation_types()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'id', typeid,
			'type', description
		)
	)
	from
		public.accommodationtype;
	return returnValue;
end;
$BODY$;

ALTER FUNCTION public.fn_get_accommodation_types()
    OWNER TO dentall_rmm2_user;
-- FUNCTION: public.fn_get_clinics()

-- DROP FUNCTION IF EXISTS public.fn_get_clinics();

CREATE OR REPLACE FUNCTION public.fn_get_clinics(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_agg(
			json_build_object(
				'id', clinicid,
				'name', clinicname
			)
		)
	from
		clinic;
	
	return returnValue;
end
	
$BODY$;

ALTER FUNCTION public.fn_get_clinics()
    OWNER TO dentall_rmm2_user;

CREATE OR REPLACE FUNCTION public.fn_get_equipped()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'id', equippedid,
			'type', description
		)
	)
	from
		public.equipped;
	return returnValue;
end;
$BODY$;

ALTER FUNCTION public.fn_get_equipped()
    OWNER TO dentall_rmm2_user;
-- FUNCTION: public.fn_get_patient_mail_info_by_id(integer)

-- DROP FUNCTION IF EXISTS public.fn_get_patient_mail_info_by_id(integer);

CREATE OR REPLACE FUNCTION public.fn_get_patient_mail_info_by_id(
	pat_id integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_agg(
			json_build_object(
				'fName', p.firstname,
				'lName', p.lastname,
				'tName', t.treatmentname,
				'cName', c.clinicname,
				'cAddress', c.clinicaddress || ',' || tow.postalcode || ',' || tow.townname,
				'from', a.datefrom,
				'till', a.dateto,
				'accAddress', acc.address || ',' || tow.postalcode || ',' || tow.townname,
				'datefrom', accocu.datefrom,
				'dateto', accocu.dateto,
				'transportReg', v.registration
			)
		)
	from
		patientplan pp
	join
		patient p
	on	pp.patientid = p.patientid
	join
		treatment t
	on	pp.treatmentid = t.treatmentid
	join
		clinic c
	on	pp.clinicid = c.clinicid
	join
		town tow
	on	c.townid = tow.townid
	join
		assigned a
	on	a.treatmentid = pp.treatmentid
	and	a.patientid = pp.patientid
	join
		accommodationoccupied accocu
	on	pp.patientid = accocu.patientid
	join
		accommodation acc
	on	accocu.accommodationid = acc.accommodationid
	join
		vehicleoccupied vo
	on	vo.patientid = pp.patientid
	join
		vehicle v
	on	vo.vehicleid = v.vehicleid
	where
		pp.patientid = pat_id;
		
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_get_patient_mail_info_by_id(integer)
    OWNER TO dentall_rmm2_user;

-- FUNCTION: api.fn_get_patient_treatment(json)

-- DROP FUNCTION IF EXISTS api.fn_get_patient_treatment(json);

CREATE OR REPLACE FUNCTION api.fn_get_patient_treatment(
	patient json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	patient_id integer := (patient->>'id')::integer;
begin
	select into
		returnValue json_agg(
			json_build_object(
				'pID', pp.patientid,
				'tID', pp.treatmentid,
				'tName', t.treatmentname,
				'cName', c.clinicname,
				'from', a.datefrom,
				'till', a.dateto
			)
		)
	from
		patientplan pp
	join
		treatment t
	on	pp.treatmentid = t.treatmentid
	join
		clinic c
	on	pp.clinicid = c.clinicid
	join
		assigned a
	on	a.treatmentid = pp.treatmentid
	and	a.patientid = pp.patientid
	where
		pp.patientid = patient_id;
		
	return returnValue;
end
	
$BODY$;

ALTER FUNCTION api.fn_get_patient_treatment(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_get_patient_treatment(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_get_patient_treatment(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_get_patient_treatment(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_get_patient_treatment(json) TO dentall_rmm2_user;


-- FUNCTION: public.fn_get_roles()

-- DROP FUNCTION IF EXISTS public.fn_get_roles();

CREATE OR REPLACE FUNCTION public.fn_get_roles(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_agg(
			json_build_object(
				'id', roleid,
				'rName', rolename
			)
		)
	from
		public.userrole;
		
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_get_roles()
    OWNER TO dentall_rmm2_user;

CREATE OR REPLACE FUNCTION public.fn_get_towns()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'id', townid,
			'townName', townname
		)
	)
	from
		public.town;
	return returnValue;
end;
	
$BODY$;

ALTER FUNCTION public.fn_get_towns()
    OWNER TO dentall_rmm2_user;
-- FUNCTION: public.fn_get_transporter_mail_info_by_id(integer)

-- DROP FUNCTION IF EXISTS public.fn_get_transporter_mail_info_by_id(integer);

CREATE OR REPLACE FUNCTION public.fn_get_transporter_mail_info_by_id(
	pat_id integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_build_object(
			'pName', p.firstname,
			'pLName', p.lastname,
			'mail', t.email,
			'timeStart', vo.timestart,
			'destination', c.address,
			'vehicle', v.brand || ' ' || v.model
		)
	from
		vehicleoccupied vo
	join
		vehicle v
	on	vo.vehicleid = v.vehicleid
	join
		patient p
	on	vo.patientid = p.patientid
	join
		patientplan pp
	on	pp.patientid = p.patientid
	join
		transporter t
	on	v.transporterid = t.transporterid
	where
		vo.patientid = pat_id;
end
$BODY$;

ALTER FUNCTION public.fn_get_transporter_mail_info_by_id(integer)
    OWNER TO dentall_rmm2_user;

CREATE FUNCTION public.fn_get_transporters()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'transporterID', transporterid,
			'name', oraganisationname
		)
	)
	from
		public.transporter;
	return returnValue;
end;
$BODY$;
ALTER FUNCTION public.fn_get_transporters()
    OWNER TO dentall_rmm2_user;
-- FUNCTION: public.fn_get_treatments()

-- DROP FUNCTION IF EXISTS public.fn_get_treatments();

CREATE OR REPLACE FUNCTION public.fn_get_treatments(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;

begin
	select into
		returnValue json_agg(
			json_build_object(
				'id', treatmentid,
				'name', treatmentname,
				'desc', description
			)
		)
	from
		public.treatment;
	
	return returnValue;
end
	
$BODY$;

ALTER FUNCTION public.fn_get_treatments()
    OWNER TO dentall_rmm2_user;

CREATE FUNCTION public.fn_get_vehicle_types()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'typeID', typeid,
			'desc', description
		)
	)
	from
		public.vehicletype;
	return returnValue;
end;
$BODY$;

ALTER FUNCTION public.fn_get_vehicle_types()
    OWNER TO dentall_rmm2_user;
-- FUNCTION: api.fn_login(json)

-- DROP FUNCTION IF EXISTS api.fn_login(json);

CREATE OR REPLACE FUNCTION api.fn_login(
	user_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
select
into
	returnValue
	json_build_object(
		'success', true,
		'user_id', cred.userid,
		'username', cred.username,
		'roleid', ar.roleid,
		'rolename', ur.rolename,
		'msg', 'Hello User'
	)
from
	auth.credentials cred
join
	public.assignedrole ar
on	cred.userid = ar.userid
join
	userrole ur
on	ar.roleid = ur.roleid
where
	username = (user_data->>'username')
and	pass = (user_data->>'password');

if returnValue is null then
	returnValue := json_build_object(
		'success', false,
		'msg', 'Sorry blake, WRONG'
	);
end if;

return returnValue;

end;
$BODY$;

ALTER FUNCTION api.fn_login(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO postgres;


CREATE OR REPLACE FUNCTION api.fn_update_accommodation_avaliability(IN acc_update json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	av bit := (acc_update->>'avaliable')::bit;
begin
	update 
		public.accommodation
	set
		active = av
	where
		accommodationid = (acc_update->>'id')::integer;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Updated accommodation avaliability'
	);
	
	return returnValue;
	
end;
$BODY$;

ALTER FUNCTION api.fn_update_accommodation_avaliability(json)
    OWNER TO dentall_rmm2_user;
CREATE FUNCTION api.fn_update_admin_info(IN updated_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare 
	returnValue json := '{"success": false, "msg": "User info not updated"}';
	user_ID integer := (updated_data->>'userID')::integer;
	rL_array integer[];
begin
	select array(
		select json_array_elements_text(updated_data->'roleList')::integer
	) into rL_array;
	
	update 
		public.adminuser 
	set 
		phone = (updated_data->>'phone'),
		email = (updated_data->>'email')
	where
		userid = user_ID;
		
	perform public.fn_assign_new_roles(rL_array, user_ID);
	
	returnValue := 	json_build_object(
		'success', true,
		'msg', 'Updated user info'
	);
	
	return returnValue;
end;		
$BODY$;

ALTER FUNCTION api.fn_update_admin_info(json)
    OWNER TO dentall_rmm2_user;
CREATE OR REPLACE FUNCTION api.fn_update_vehicle_avaliability(IN vehicle_update json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	av bit := (vehicle_update->>'avaliable')::bit;
begin
	update 
		public.vehicle
	set
		active = av
	where
		vehicleid = (vehicle_update->>'id')::integer;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Updated vehicle avaliability'
	);
	
	return returnValue;
	
end;
$BODY$;

ALTER FUNCTION api.fn_update_vehicle_avaliability(json)
    OWNER TO dentall_rmm2_user;
CREATE OR REPLACE FUNCTION api.fn_view_accommodations()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	with
		cte as(
			select
				acc.accommodationid acc_id,
				acc.realestateid realestate_id,
				acctype.description acc_type,
				eq.description equipped_type,
				acc.address || ', ' || t.postalcode || ', ' || t.townname acc_address,
				acc.active acc_active
			from
				accommodation acc
			join 
				accommodationtype acctype
			on	acc.typeid = acctype.typeid
			join
				equipped eq
			on	eq.equippedid = acc.equippedid
			join
				town t
			on	acc.townid = t.townid
			order by
				acc.accommodationid
		)
	select into 
	returnValue json_agg(
		json_build_object(
			'id', cte.acc_id,
			're_id', cte.realestate_id,
			'acc_type', cte.acc_type,
			'acc_eq', cte.equipped_type,
			'address', cte.acc_address,
			'active', cte.acc_active
		)
	)
	from
		cte;
		
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_view_accommodations()
    OWNER TO dentall_rmm2_user;
-- FUNCTION: api.fn_view_admins()

-- DROP FUNCTION IF EXISTS api.fn_view_admins();

CREATE OR REPLACE FUNCTION api.fn_view_admins(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	with
		cte_ordered as(
			select
				au.userid u_id,
				au.pin pin,
				au.firstname f_name,
				au.lastname l_name,
				au.phone ph,
				au.email mail
			from
				public.adminuser au
			order by
				au.userid
		), cte_role as(
			select
				ar.userid,
				array_agg(ur.rolename) rL
			from
				userrole ur
			join
				assignedrole ar
			on ur.roleid = ar.roleid
			group by ar.userid
		)
	select into
		returnValue json_agg(
			json_build_object(
				'id', cte_ordered.u_id,
				'PIN', cte_ordered.pin,
				'fName', cte_ordered.f_name,
				'lName', cte_ordered.l_name,
				'phone', cte_ordered.ph,
				'email', cte_ordered.mail,
				'roles', cte_role.rL
			)
		)
	from
		cte_ordered
	join
		cte_role
	on	cte_ordered.u_id = cte_role.userid;
	
return returnValue;

end;
$BODY$;

ALTER FUNCTION api.fn_view_admins()
    OWNER TO dentall_rmm2_user;

-- FUNCTION: api.fn_view_patients()

-- DROP FUNCTION IF EXISTS api.fn_view_patients();

CREATE OR REPLACE FUNCTION api.fn_view_patients(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_agg(
			json_build_object(
				'patientID', p.patientid,
				'PIN', p.pin,
				'fName', p.firstname,
				'lName', p.lastname,
				'contact', p.phone,
				'email', p.email,
				'HomeAddress', p.residenceaddress
			)
		)
	from
		public.patient p;
		
	return returnValue;
end
$BODY$;

ALTER FUNCTION api.fn_view_patients()
    OWNER TO dentall_rmm2_user;

CREATE OR REPLACE FUNCTION api.fn_view_transporter_vehicles(IN transporter_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100
    
AS $BODY$
declare
	returnValue json;
	transporter_id integer := (transporter_in->>'transporterID')::integer;
begin

select into
	returnValue json_agg(
		json_build_object(
			'vehicleID', v.vehicleid,
			'registration', v.registration,
			'brand', v.brand,
			'model', v.model,
			'capacity', v.capacity,
			'type', vt.description
		)
	)
from
	public.vehicle v
join
	public.vehicletype vt
on	v.typeid = vt.typeid
where
	transporterid = transporter_id;
return returnValue;

end;
$BODY$;

ALTER FUNCTION api.fn_view_transporter_vehicles(json)
    OWNER TO dentall_rmm2_user;
-- FUNCTION: api.fn_view_transporters()

-- DROP FUNCTION IF EXISTS api.fn_view_transporters();

CREATE OR REPLACE FUNCTION api.fn_view_transporters(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;

begin
	with
		cte_ordered as(
			select
				trans.transporterid t_id,
				trans.orgcode org,
				trans.organisationname o_name,
				trans.phone ph,
				trans.email mail,
				trans.address || ',' || t.postalcode || ',' || t.townname addr, 
				trans.active ac
			from
				public.transporter trans
			join
				public.town t
			on trans.townid = t.townid
			order by
				trans.transporterid
		)
	select into
		returnValue json_agg(
			json_build_object(
				'id', cte_ordered.t_id,
				'code', cte_ordered.org,
				'name', cte_ordered.o_name,
				'phone', cte_ordered.ph,
				'email', cte_ordered.mail,
				'address', cte_ordered.addr,
				'active', cte_ordered.ac
			)
		)
	from
		cte_ordered;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_view_transporters()
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO dentall_rmm2_user;

