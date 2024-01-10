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
