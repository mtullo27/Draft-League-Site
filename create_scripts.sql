create table if not exists league.coach (
	id UUID primary key default gen_random_uuid(),
	username TEXT NOT NULL,
	discord_user_id TEXT,
	smogon_name TEXT,
	sprite_url TEXT,
	theme TEXT default 'light',
	last_sign_on timestamp
)

create table if not exists league.league (
	id TEXT primary key,
	name TEXT NOT NULL,
	commissioner_id UUID NOT NULL REFERENCES league.coach(id) ON DELETE SET NULL,
	min_team_size int NOT NULL default 10,
	max_team_size int NOT NULL default 12,
	format text
)

create table if not exists league.rule_category (
	id SERIAL primary key,
	category_title TEXT NOT NULL,
	category_description TEXT
)

create table if not exists league.rule (
	id SERIAL primary key,
	league_id TEXT NOT NULL REFERENCES league.league(id),
	rule_text TEXT NOT NULL,
	rule_category_id int NOT NULL REFERENCES league.rule_category
)

create table if not exists league.team (
	id UUID primary key default gen_random_uuid(),
	coach_id UUID NOT NULL REFERENCES league.coach(id) ON DELETE SET NULL,
	league_id TEXT NOT NULL REFERENCES league.league(id) ON DELETE SET NULL,
	pokemon1_id int,
	pokemon2_id int,
	pokemon3_id int,
	pokemon4_id int,
	pokemon5_id int,
	pokemon6_id int,
	pokemon7_id int,
	pokemon8_id int,
	pokemon9_id int,
	pokemon10_id int,
	pokemon11_id int,
	pokemon12_id int
)

create table if not exists league.admin (
	coach_id UUID NOT NULL REFERENCES league.coach(id) ON DELETE SET NULL,
	league_id TEXT NOT NULL REFERENCES league.league(id) ON DELETE CASCADE,
	primary key (coach_id, league_id)
)

create table if not exists league.game_type (
	id UUID primary key default gen_random_uuid(),
	type_text TEXT NOT NULL
)

create table if not exists league.schedule (
	id UUID primary key default gen_random_uuid(),
	coach1_id UUID NOT NULL REFERENCES league.coach(id) ON DELETE SET NULL,
	coach2_id UUID NOT NULL REFERENCES league.coach(id) ON DELETE SET NULL,
	game_type_id UUID NOT NULL REFERENCES league.game_type(id) ON DELETE SET NULL,
	scheduled_for timestamp,
	played_on timestamp,
	live_link TEXT,
	replay_link TEXT,
	log_id int NOT NULL REFERENCES replay.showdown_replay(id) ON DELETE SET NULL
)

create table if not exists league.draft (
	id SERIAL primary key,
	pic_number int NOT NULL,
	pokemon_id int NOT NULL,
	coach_id UUID NOT NULL REFERENCES league.coach(id) ON DELETE SET NULL
)

create table if not exists audit.audit_log (
	id UUID primary key default gen_random_uuid(),
	event_id int NOT NULL REFERENCES audit.event(id),
	audit_text TEXT NOT NULL default 'ENTER TEXT',
	coach_id UUID NOT NULL rEFeRENCES league.coach(id),
	timestamp timestamp NOT NULL
)

create table if not exists league.division (
	id UUID primary key default gen_random_uuid(),
	league_id TEXT NOT NULL REFERENCES league.league(id) ON DELETE CASCADE,
	name TEXT NOT NULL
)

create table if not exists league.roster (
	coach_id UUID NOT NULL REFERENCES league.coach(id) ON DELETE SET NULL,
	league_id TEXT NOT NULL REFERENCES league.league(id) ON DELETE CASCADE,
	division_id UUID NOT NULL REFERENCES league.division(id) ON DELETE SET NULL,
	primary key (coach_id, league_id, division_id)
)

create table if not exists league.tier (
	id bigserial primary key,
	tier_text TEXT NOT NULL,
	pokemon text NOT NULL
)

create table if not exists league.alias (
	coach_id UUID NOT NULL REFERENCES league.coach(id),
	alias_text TEXT NOT NULL,
	primary key(coach_id, alias_text)
)

create table if not exists league.info (
	id UUID primary key default gen_random_uuid(),
	league_id TEXT not null references league.league(id),
	key TEXT NOT NULL,
	value TEXT NOT NULL,
	version TEXT NOT NULL
)