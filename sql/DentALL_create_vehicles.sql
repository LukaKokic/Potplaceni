
INSERT INTO public.vehicle(
	registration, 
	capacity,
	typeid,
	brand,
	model,
	transporterid,
	active
)


with cte_pool as (
	select
		('[{"Dacia":["Logan MVC","Duster","Sandero"]},{"BMW":["M5","M3","i3"]},{"Tesla":["Model S","Model 3","Model X"]},{"Skoda":["Octavia","Enyaq","Superb"]},{"Volkswagen":["Passat","Golf 5","Tiguan"]},{"Mercedes":["S class","E class","C class"]}]'::json) pool
)
, cte_brands as (
select
	pool->floor(random()*6)::int brand,
	generate_series(1,15,1) rbr
from
	cte_pool
)
select
	upper(left(t.townname, 2)) || (random()*10000)::int || CHR(floor(random()* 24 + 65)::int) || CHR(floor(random()* 24 + 65)::int) reg,
	3 cap,
	3 tid,
	json_object_keys(brand) brand,
	brand->json_object_keys(brand)->>floor(random()*3)::int model,
	tr.transporterid tid,
	case when random()>0.95 then 0::bit else 1::bit end active
from
	cte_brands
cross join
	transporter tr
join
	town t
on tr.townid = t.townid
