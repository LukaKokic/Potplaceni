INSERT INTO public.transporter(
	orgcode, 
	organisationname,
	phone,
	email,
	townid,
	active
)

with cte_town as (
	select 
		distinct t.townname,
		t.townid,
		(random()*3+5)::int tahi_count
	from
		clinic c
	join
		town t
	on c.townid = t.townid
)
select
	md5(random()::varchar)::char(10) orgcode,
	'Taxi ' || townname || ' ' || generate_series(1,tahi_count, 1)::varchar orgname,
	'+3859' || (array['1','8','9']::char[])[floor(random()*3+1)::int] || (random()*100000)::int::varchar phoneno,
	'taxi_' || lower(townname) || generate_series(1,tahi_count, 1)::varchar || (array['@tcom.hr','@gmail.com','@yahoo.com']::varchar[])[floor(random()*3+1)::int] email,
	townid,
	case when random()>0.95 then 0::bit else 1::bit end active
from
	cte_town
	
	