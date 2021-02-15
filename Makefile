install:
	@npm install

api:
	@npm run dev

db:
	@docker-compose -f docker-compose-db.yml up