-- FUNCTION: api.fn_view_transporters()

-- DROP FUNCTION IF EXISTS api.fn_view_transporters();

CREATE OR REPLACE FUNCTION api.fn_view_transporters(
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
				trans.transporterid t_id,
				trans.orgcode org,
				trans.organisationname o_name,
				trans.phone ph,
				trans.email mail,
				trans.address || ',' || t.postalcode || ',' || t.townname addr, 
				trans.active ac
			from
				public.transporter trans
			join
				public.town t
			on trans.townid = t.townid
			order by
				trans.transporterid
		)
	select into
		returnValue json_agg(
			json_build_object(
				'id', cte_ordered.t_id,
				'code', cte_ordered.org,
				'name', cte_ordered.o_name,
				'phone', cte_ordered.ph,
				'email', cte_ordered.mail,
				'address', cte_ordered.addr,
				'active', cte_ordered.ac
			)
		)
	from
		cte_ordered;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_view_transporters()
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_view_transporters() TO dentall_rmm2_user;

