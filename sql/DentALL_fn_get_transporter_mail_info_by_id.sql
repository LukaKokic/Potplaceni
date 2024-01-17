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
		returnValue 
			json_build_object(
				'pName', p.firstname,
				'pLName', p.lastname,
				'pContact', p.phone,
				'mail', t.email,
				'dateOfTreatment', a.dot,
				'timeMorning', '07:00:00',
				'timeNoon', '16:00:00',
				'startingPoint', acc.address,
				'destination', c.clinicaddress,
				'vehicle', v.brand || ' ' || v.model,
				'rgistration', v.registration
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
		assigned a
	on	a.patientid = pp.patientid
	and	a.treatmentid = pp.treatmentid
	join
		transporter t
	on	v.transporterid = t.transporterid
	join
		accommodationoccupied accocu
	on	accocu.patientid = pp.patientid
	join
		accommodation acc
	on	accocu.accommodationid = acc.accommodationid
	join
		clinic c
	on	pp.clinicid = c.clinicid
	where
		vo.patientid = pat_id;
	
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_get_transporter_mail_info_by_id(integer)
    OWNER TO dentall_rmm2_user;
