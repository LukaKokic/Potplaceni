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