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
