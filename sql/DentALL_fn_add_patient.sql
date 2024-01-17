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
	treatment_date date := (patient_in->>'treatmentDate')::date;
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
	
	INSERT INTO public.assigned (treatmentid, patientid, dot)
	VALUES (treatment_id, patient_id, treatment_date);
	
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

