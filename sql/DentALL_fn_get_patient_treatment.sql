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

