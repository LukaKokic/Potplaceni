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
	town integer := (data_in->>'townID')::integer;
	ac bit := (data_in->>'active')::bit;
	
	org_code varchar;

begin
	select into org_code
		'ORG-' || left(MD5(org_name),6);

	if (select count(*) from public.transporter where orgcode = org_code) = 0 then			
		INSERT INTO public.transporter (orgcode, organisationname, phone, email, townid, active)
		VALUES (org_code, org_name, contact, mail, town, ac);
	
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

GRANT EXECUTE ON FUNCTION api.fn_add_transporter(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter(json) TO dentall_rmm2_user;

