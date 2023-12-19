CREATE OR REPLACE FUNCTION api.fn_add_transporter(IN data_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json := '{"success": false, "msg":"Transporter could not be created"}';
	org_name varchar := (data_in->>'orgName')::varchar;
	contact varchar := (data_in->>'contact')::varchar;
	addr varchar := (data_in->>'address')::varchar;
	town integer := (data_in->>'townID')::integer;
	ac bit := (data_in->>'active')::bit;

begin
	if (select count(*) from public.transporter where organisationname = org_name) = 0 then
		INSERT INTO public.transporter (organisationname, phone, address, townid, active)
		VALUES (org_name, contact, addr, town, ac);
	
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