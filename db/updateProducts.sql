update products
set img = $2, title = $3, description = $4, price = $5
where id = $1;

select * from products;