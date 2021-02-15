install:
	@npm install

app:
	@npm run dev

db:
	@docker-compose -f docker-compose-db.yml up