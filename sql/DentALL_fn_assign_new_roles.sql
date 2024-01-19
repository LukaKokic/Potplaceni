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