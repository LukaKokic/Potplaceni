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