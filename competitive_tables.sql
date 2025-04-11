CREATE TABLE pokemon_sets (
    id SERIAL PRIMARY KEY,
    pokemon_name TEXT NOT NULL,
    item TEXT,
    ability TEXT,
    tera_type TEXT,
    nature TEXT,
    evs JSONB DEFAULT '{}'::JSONB,
    ivs JSONB DEFAULT '{}'::JSONB,
    moves TEXT[] NOT NULL
);


CREATE TABLE competitive.pokemon_teams (
    id SERIAL PRIMARY KEY,
    team_name TEXT,
    source TEXT CHECK (source IN ('text', 'json'))
);

CREATE TABLE competitive.pokemon_team_sets (
    team_id INTEGER REFERENCES competitive.pokemon_teams(id) ON DELETE CASCADE,
    set_id INTEGER REFERENCES competitive.pokemon_sets(id) ON DELETE CASCADE,
    slot INTEGER CHECK (slot BETWEEN 1 AND 6),
    PRIMARY KEY (team_id, slot)
);
