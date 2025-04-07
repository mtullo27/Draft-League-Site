
# 🧾 League Management API – Route Documentation

This API serves as the backend for a league-based Pokémon Showdown draft system. It supports CRUD operations across various league entities such as coaches, divisions, drafts, leagues, teams, and more.

---

## 🔗 Base URL
```
http://<your-server-address>/
```

---

## 📁 Routes

### `/admin`
Manage league admins.

- `GET /admin`: Get all admin entries.
- `POST /admin`: Create a new admin. Requires `league_id`, `coach_id`.
- `PUT /admin/:league_id`: Update an admin by league ID.

---

### `/coach/alias`
Handle aliases for coaches.

- `GET /coach/alias`: Get all aliases.
- `POST /coach/alias`: Create an alias. Requires `coach_id`, `alias_text`.
- `PUT /coach/alias/:coach_id`: Update alias for a given coach.

---

### `/admin/audit_log`
Track audit events (e.g., changes, actions).

- `GET /admin/audit_log`: Get all audit logs.
- `POST /admin/audit_log`: Create a log entry. Requires `id`, `coach_id`, `timestamp`, `event_id`, `audit_text`.
- `PUT /admin/audit_log/:id`: Update a log entry.

---

### `/coach`
Manage coaches (users participating in the league).

- `GET /coach`: Get all coaches.
- `GET /coach/:id`: Get a coach by ID.
- `GET /coach/teams/:id`: Get all teams for a coach.
- `GET /coach/teams/league/:id`: Get all teams in a league.
- `POST /coach`: Create a new coach. Requires `username`, optional: `discord_user_id`, `showdown_name`, `sprite_url`, `theme`.
- `PUT /coach/:id`: Update coach fields dynamically.

---

### `/league/division`
Manage divisions within leagues.

- `GET /league/division`: Get all divisions.
- `POST /league/division`: Create a division. Requires `league_id`, `name`.
- `PUT /league/division/:id`: Update a division.

---

### `/league/draft`
Manage Pokémon draft picks.

- `GET /league/draft`: Get all draft picks.
- `POST /league/draft`: Create a draft pick. Requires `pokemon_id`, `coach_id`, `pic_number`, `id`.
- `PUT /league/draft/:id`: Update a draft pick.

---

### `/audit/event`
Manage or retrieve events used for auditing.

---

### `/league/schedule/game_type`
Manage types of games/schedules.

---

### `/`
General metadata for leagues.

- `GET /`: Get all metadata entries from `league.info`.
- `POST /`: Add a metadata entry. Requires `league_id`, `value`, `version`, `id`, `key`.
- `PUT /:id`: Update metadata by ID.

---

### `/kill_leaders`
Track Pokémon or coach kill/death stats.

---

### `/league`
Manage leagues and retrieve league-wide data.

- `GET /league`: Get all leagues.
- `GET /league/:id`: Get a league by ID.
- `GET /league/teams/:id`: Get all teams in a league.
- `GET /league/stats/:id`: Get league-wide coach stats.
- `POST /league`: Create a league.
- `PUT /league/:id`: Update a league.

---

### `/player_stats`
Manage or fetch coach performance statistics.

---

### `/league/roster`
Manage coach placement in divisions.

- `GET /league/roster`: Get all roster entries.
- `POST /league/roster`: Create a roster entry. Requires `league_id`, `coach_id`, `division_id`.
- `PUT /league/roster/:league_id`: Update roster for a league.

---

### `/league/tier`
Manage Pokémon tiers within leagues.

- `GET /league/tier`: Get all tiers.
- `POST /league/tier`: Create a new tier. Requires `id`, `tier_text`, `pokemon`, `league_id`.
- `PUT /league/tier/:id`: Update a tier.

---

## 🧱 Tech Stack

- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Data Layer**: SQL queries in route files
- **UUID Generation**: `uuid` package

