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
