select user.first_name, user.last_name, vehicles.make, vehicles.model, vehicles.year from vehicles
join users on ownerId = ownerId
where year > 2000
order by year asc
