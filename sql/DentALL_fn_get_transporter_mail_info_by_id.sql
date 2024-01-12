-- FUNCTION: public.fn_get_transporter_mail_info_by_id(integer)

-- DROP FUNCTION IF EXISTS public.fn_get_transporter_mail_info_by_id(integer);

CREATE OR REPLACE FUNCTION public.fn_get_transporter_mail_info_by_id(
	pat_id integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_build_object(
			'pName', p.firstname,
			'pLName', p.lastname,
			'mail', t.email,
			'timeStart', vo.timestart,
			'destination', c.address,
			'vehicle', v.brand || ' ' || v.model
		)
	from
		vehicleoccupied vo
	join
		vehicle v
	on	vo.vehicleid = v.vehicleid
	join
		patient p
	on	vo.patientid = p.patientid
	join
		patientplan pp
	on	pp.patientid = p.patientid
	join
		transporter t
	on	v.transporterid = t.transporterid
	where
		vo.patientid = pat_id;
end
$BODY$;

ALTER FUNCTION public.fn_get_transporter_mail_info_by_id(integer)
    OWNER TO dentall_rmm2_user;
