insert into products ( img, title, description, price )
values ( $1, $2, $3, $4 );

select * from products
order by id;