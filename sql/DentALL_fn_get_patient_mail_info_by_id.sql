-- FUNCTION: public.fn_get_patient_mail_info_by_id(integer)

-- DROP FUNCTION IF EXISTS public.fn_get_patient_mail_info_by_id(integer);

CREATE OR REPLACE FUNCTION public.fn_get_patient_mail_info_by_id(
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
		returnValue json_agg(
			json_build_object(
				'fName', p.firstname,
				'lName', p.lastname,
				'tName', t.treatmentname,
				'cName', c.clinicname,
				'cAddress', c.clinicaddress || ',' || tow.postalcode || ',' || tow.townname,
				'from', a.datefrom,
				'till', a.dateto,
				'accAddress', acc.address || ',' || tow.postalcode || ',' || tow.townname,
				'datefrom', accocu.datefrom,
				'dateto', accocu.dateto,
				'transportReg', v.registration
			)
		)
	from
		patientplan pp
	join
		patient p
	on	pp.patientid = p.patientid
	join
		treatment t
	on	pp.treatmentid = t.treatmentid
	join
		clinic c
	on	pp.clinicid = c.clinicid
	join
		town tow
	on	c.townid = tow.townid
	join
		assigned a
	on	a.treatmentid = pp.treatmentid
	and	a.patientid = pp.patientid
	join
		accommodationoccupied accocu
	on	pp.patientid = accocu.patientid
	join
		accommodation acc
	on	accocu.accommodationid = acc.accommodationid
	join
		vehicleoccupied vo
	on	vo.patientid = pp.patientid
	join
		vehicle v
	on	vo.vehicleid = v.vehicleid
	where
		pp.patientid = pat_id;
		
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_get_patient_mail_info_by_id(integer)
    OWNER TO dentall_rmm2_user;
