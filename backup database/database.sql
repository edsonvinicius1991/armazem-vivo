--
-- PostgreSQL database cluster dump
--

\restrict lKC4rweEblnyVWusDzvXR23ChSWtTQLhbstyUGyVhXnqyUM3Ns9WqYSXLFSSCz7

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE anon;
ALTER ROLE anon WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticated;
ALTER ROLE authenticated WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticator;
ALTER ROLE authenticator WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE cli_login_postgres;
ALTER ROLE cli_login_postgres WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS VALID UNTIL '2025-10-12 21:42:51.865678+00';
CREATE ROLE dashboard_user;
ALTER ROLE dashboard_user WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE pgbouncer;
ALTER ROLE pgbouncer WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE postgres;
ALTER ROLE postgres WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE service_role;
ALTER ROLE service_role WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION BYPASSRLS;
CREATE ROLE supabase_admin;
ALTER ROLE supabase_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE supabase_auth_admin;
ALTER ROLE supabase_auth_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_etl_admin;
ALTER ROLE supabase_etl_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE supabase_read_only_user;
ALTER ROLE supabase_read_only_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION BYPASSRLS;
CREATE ROLE supabase_realtime_admin;
ALTER ROLE supabase_realtime_admin WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_replication_admin;
ALTER ROLE supabase_replication_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE supabase_storage_admin;
ALTER ROLE supabase_storage_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;

--
-- User Configurations
--

--
-- User Config "anon"
--

ALTER ROLE anon SET statement_timeout TO '3s';

--
-- User Config "authenticated"
--

ALTER ROLE authenticated SET statement_timeout TO '8s';

--
-- User Config "authenticator"
--

ALTER ROLE authenticator SET session_preload_libraries TO 'safeupdate';
ALTER ROLE authenticator SET statement_timeout TO '8s';
ALTER ROLE authenticator SET lock_timeout TO '8s';

--
-- User Config "postgres"
--

ALTER ROLE postgres SET search_path TO E'\\$user', 'public', 'extensions';

--
-- User Config "supabase_admin"
--

ALTER ROLE supabase_admin SET search_path TO '$user', 'public', 'auth', 'extensions';
ALTER ROLE supabase_admin SET log_statement TO 'none';

--
-- User Config "supabase_auth_admin"
--

ALTER ROLE supabase_auth_admin SET search_path TO 'auth';
ALTER ROLE supabase_auth_admin SET idle_in_transaction_session_timeout TO '60000';
ALTER ROLE supabase_auth_admin SET log_statement TO 'none';

--
-- User Config "supabase_read_only_user"
--

ALTER ROLE supabase_read_only_user SET default_transaction_read_only TO 'on';

--
-- User Config "supabase_storage_admin"
--

ALTER ROLE supabase_storage_admin SET search_path TO 'storage';
ALTER ROLE supabase_storage_admin SET log_statement TO 'none';


--
-- Role memberships
--

GRANT anon TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT anon TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticated TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT authenticated TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO supabase_storage_admin WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT pg_create_subscription TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_monitor TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO supabase_etl_admin WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO supabase_read_only_user WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_signal_backend TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT postgres TO cli_login_postgres WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT service_role TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT service_role TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT supabase_realtime_admin TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;






\unrestrict lKC4rweEblnyVWusDzvXR23ChSWtTQLhbstyUGyVhXnqyUM3Ns9WqYSXLFSSCz7

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict dNeaIGisjQzGAwVPPrlxpxE8HIh62URtGvubj43UaPeVqPEgL9DkniB58gT2fPu

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6 (Debian 17.6-2.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict dNeaIGisjQzGAwVPPrlxpxE8HIh62URtGvubj43UaPeVqPEgL9DkniB58gT2fPu

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict N5sil8kgm1E7dvYJg7AXNMujJKWFH393LqpXF2KNay11tYWVM2Bvk7LH56rgQ16

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6 (Debian 17.6-2.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: app_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'operador',
    'visualizador'
);


ALTER TYPE public.app_role OWNER TO postgres;

--
-- Name: status_produto; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_produto AS ENUM (
    'ativo',
    'inativo',
    'descontinuado'
);


ALTER TYPE public.status_produto OWNER TO postgres;

--
-- Name: status_recebimento; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_recebimento AS ENUM (
    'pendente',
    'em_conferencia',
    'finalizado',
    'cancelado'
);


ALTER TYPE public.status_recebimento OWNER TO postgres;

--
-- Name: tipo_localizacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_localizacao AS ENUM (
    'picking',
    'bulk',
    'quarentena'
);


ALTER TYPE public.tipo_localizacao OWNER TO postgres;

--
-- Name: tipo_movimentacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_movimentacao AS ENUM (
    'entrada',
    'saida',
    'transferencia',
    'ajuste'
);


ALTER TYPE public.tipo_movimentacao OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: calcular_estoque_produto(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calcular_estoque_produto(produto_uuid uuid) RETURNS numeric
    LANGUAGE sql STABLE
    AS $$
    SELECT COALESCE(SUM(quantidade), 0)
    FROM public.estoque_localizacao
    WHERE produto_id = produto_uuid;
$$;


ALTER FUNCTION public.calcular_estoque_produto(produto_uuid uuid) OWNER TO postgres;

--
-- Name: gerar_alertas_estoque(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.gerar_alertas_estoque() RETURNS TABLE(alertas_criados integer, produtos_verificados integer)
    LANGUAGE plpgsql
    AS $$
DECLARE
    produto_record RECORD;
    estoque_atual NUMERIC;
    total_alertas INTEGER := 0;
    total_produtos INTEGER := 0;
BEGIN
    -- Desativar alertas antigos de estoque mínimo/máximo
    UPDATE public.alertas_estoque 
    SET ativo = false
    WHERE tipo_alerta IN ('estoque_minimo', 'estoque_maximo') 
    AND ativo = true;

    -- Verificar produtos com estoque baixo
    FOR produto_record IN 
        SELECT id, sku, nome, estoque_minimo, estoque_maximo
        FROM public.produtos 
        WHERE status = 'ativo' AND estoque_minimo > 0
    LOOP
        total_produtos := total_produtos + 1;
        estoque_atual := public.calcular_estoque_produto(produto_record.id);

        -- Alerta de estoque mínimo
        IF estoque_atual <= produto_record.estoque_minimo THEN
            INSERT INTO public.alertas_estoque (
                produto_id, tipo_alerta, nivel_criticidade, 
                quantidade_atual, quantidade_referencia, mensagem
            ) VALUES (
                produto_record.id, 'estoque_minimo', 
                CASE WHEN estoque_atual = 0 THEN 'critico' ELSE 'alto' END,
                estoque_atual, produto_record.estoque_minimo,
                FORMAT('Produto %s (%s) com estoque baixo: %s unidades (mínimo: %s)', 
                       produto_record.nome, produto_record.sku, 
                       estoque_atual, produto_record.estoque_minimo)
            );
            total_alertas := total_alertas + 1;
        END IF;

        -- Alerta de estoque máximo
        IF produto_record.estoque_maximo IS NOT NULL AND estoque_atual >= produto_record.estoque_maximo THEN
            INSERT INTO public.alertas_estoque (
                produto_id, tipo_alerta, nivel_criticidade, 
                quantidade_atual, quantidade_referencia, mensagem
            ) VALUES (
                produto_record.id, 'estoque_maximo', 'medio',
                estoque_atual, produto_record.estoque_maximo,
                FORMAT('Produto %s (%s) com estoque alto: %s unidades (máximo: %s)', 
                       produto_record.nome, produto_record.sku, 
                       estoque_atual, produto_record.estoque_maximo)
            );
            total_alertas := total_alertas + 1;
        END IF;
    END LOOP;

    RETURN QUERY SELECT total_alertas, total_produtos;
END;
$$;


ALTER FUNCTION public.gerar_alertas_estoque() OWNER TO postgres;

--
-- Name: handle_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_updated_at() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: alertas_estoque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alertas_estoque (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    produto_id uuid,
    tipo_alerta character varying(50) NOT NULL,
    nivel_criticidade character varying(20) DEFAULT 'medio'::character varying,
    quantidade_atual numeric NOT NULL,
    quantidade_referencia numeric,
    mensagem text NOT NULL,
    ativo boolean DEFAULT true,
    data_criacao timestamp with time zone DEFAULT now(),
    data_resolucao timestamp with time zone,
    resolvido_por uuid,
    observacoes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.alertas_estoque OWNER TO postgres;

--
-- Name: almoxarifados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.almoxarifados (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    codigo character varying(20) NOT NULL,
    nome character varying(100) NOT NULL,
    endereco text,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.almoxarifados OWNER TO postgres;

--
-- Name: estoque_localizacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estoque_localizacao (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    produto_id uuid NOT NULL,
    localizacao_id uuid NOT NULL,
    lote_id uuid,
    quantidade numeric(10,2) DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    reservado numeric DEFAULT 0
);


ALTER TABLE public.estoque_localizacao OWNER TO postgres;

--
-- Name: historico_estoque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historico_estoque (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    produto_id uuid,
    lote_id uuid,
    localizacao_id uuid,
    quantidade_anterior numeric NOT NULL,
    quantidade_nova numeric NOT NULL,
    diferenca numeric NOT NULL,
    tipo_operacao character varying(50) NOT NULL,
    documento_referencia character varying(100),
    usuario_id uuid,
    data_operacao timestamp with time zone DEFAULT now(),
    observacoes text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.historico_estoque OWNER TO postgres;

--
-- Name: localizacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.localizacoes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    almoxarifado_id uuid NOT NULL,
    codigo character varying(50) NOT NULL,
    rua character varying(10),
    prateleira character varying(10),
    nivel character varying(10),
    box character varying(10),
    tipo public.tipo_localizacao DEFAULT 'bulk'::public.tipo_localizacao,
    capacidade_maxima numeric(10,2),
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    descricao text,
    capacidade_peso numeric,
    altura numeric,
    largura numeric,
    profundidade numeric,
    temperatura_min numeric,
    temperatura_max numeric,
    observacoes text
);


ALTER TABLE public.localizacoes OWNER TO postgres;

--
-- Name: lotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lotes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    produto_id uuid NOT NULL,
    numero_lote character varying(50) NOT NULL,
    data_fabricacao date,
    data_validade date,
    quantidade_inicial numeric(10,2) DEFAULT 0 NOT NULL,
    quantidade_atual numeric(10,2) DEFAULT 0 NOT NULL,
    bloqueado boolean DEFAULT false,
    motivo_bloqueio text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.lotes OWNER TO postgres;

--
-- Name: movimentacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movimentacoes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tipo public.tipo_movimentacao NOT NULL,
    produto_id uuid NOT NULL,
    lote_id uuid,
    localizacao_origem_id uuid,
    localizacao_destino_id uuid,
    quantidade numeric(10,2) NOT NULL,
    documento character varying(100),
    observacao text,
    realizada_por uuid,
    realizada_em timestamp with time zone DEFAULT now(),
    custo_unitario numeric(10,2),
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.movimentacoes OWNER TO postgres;

--
-- Name: produtos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produtos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    sku character varying(50) NOT NULL,
    nome character varying(200) NOT NULL,
    descricao text,
    categoria character varying(100),
    unidade character varying(10) NOT NULL,
    codigo_barras character varying(50),
    peso_kg numeric(8,3),
    altura_cm numeric(8,2),
    largura_cm numeric(8,2),
    profundidade_cm numeric(8,2),
    custo_unitario numeric(10,2),
    preco_venda numeric(10,2),
    estoque_minimo numeric(10,2) DEFAULT 0,
    estoque_maximo numeric(10,2),
    controla_lote boolean DEFAULT false,
    controla_validade boolean DEFAULT false,
    status public.status_produto DEFAULT 'ativo'::public.status_produto,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.produtos OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    nome_completo text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    telefone text
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: recebimento_itens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recebimento_itens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    recebimento_id uuid NOT NULL,
    produto_id uuid NOT NULL,
    lote_numero character varying(50),
    quantidade_esperada numeric(10,2) NOT NULL,
    quantidade_recebida numeric(10,2) DEFAULT 0,
    data_fabricacao date,
    data_validade date,
    localizacao_sugerida uuid,
    localizacao_confirmada uuid,
    observacoes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.recebimento_itens OWNER TO postgres;

--
-- Name: recebimentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recebimentos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    numero_documento character varying(50) NOT NULL,
    fornecedor character varying(200) NOT NULL,
    data_prevista date NOT NULL,
    data_recebimento timestamp with time zone,
    status public.status_recebimento DEFAULT 'pendente'::public.status_recebimento,
    observacoes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.recebimentos OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role DEFAULT 'operador'::public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    almoxarifado_id uuid
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: vw_estoque_consolidado; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_estoque_consolidado AS
 SELECT p.id AS produto_id,
    p.sku,
    p.nome AS produto_nome,
    p.categoria,
    p.unidade AS unidade_medida,
    p.estoque_minimo,
    p.estoque_maximo,
    COALESCE(p.preco_venda, p.custo_unitario, (0)::numeric) AS valor_unitario,
    COALESCE(sum(el.quantidade), (0)::numeric) AS quantidade_total,
    COALESCE(sum((el.quantidade * COALESCE(p.preco_venda, p.custo_unitario, (0)::numeric))), (0)::numeric) AS valor_total_estoque,
    count(DISTINCT el.localizacao_id) AS localizacoes_ocupadas,
    count(DISTINCT el.lote_id) AS lotes_ativos,
        CASE
            WHEN (COALESCE(sum(el.quantidade), (0)::numeric) = (0)::numeric) THEN 'CRITICO'::text
            WHEN (COALESCE(sum(el.quantidade), (0)::numeric) <= p.estoque_minimo) THEN 'CRITICO'::text
            WHEN (COALESCE(sum(el.quantidade), (0)::numeric) <= (p.estoque_minimo * 1.2)) THEN 'BAIXO'::text
            WHEN ((p.estoque_maximo IS NOT NULL) AND (COALESCE(sum(el.quantidade), (0)::numeric) >= p.estoque_maximo)) THEN 'EXCESSO'::text
            ELSE 'NORMAL'::text
        END AS status_estoque,
    max(el.updated_at) AS ultima_movimentacao
   FROM (public.produtos p
     LEFT JOIN public.estoque_localizacao el ON ((p.id = el.produto_id)))
  WHERE (p.status = 'ativo'::public.status_produto)
  GROUP BY p.id, p.sku, p.nome, p.categoria, p.unidade, p.estoque_minimo, p.estoque_maximo, p.preco_venda, p.custo_unitario;


ALTER VIEW public.vw_estoque_consolidado OWNER TO postgres;

--
-- Name: vw_lotes_vencimento; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_lotes_vencimento AS
 SELECT l.id AS lote_id,
    l.numero_lote,
    l.produto_id,
    p.sku,
    p.nome AS produto_nome,
    l.data_validade,
    COALESCE(sum(el.quantidade), (0)::numeric) AS quantidade_total,
        CASE
            WHEN (l.data_validade < CURRENT_DATE) THEN 'VENCIDO'::text
            WHEN (l.data_validade <= (CURRENT_DATE + '30 days'::interval)) THEN 'VENCENDO_30_DIAS'::text
            WHEN (l.data_validade <= (CURRENT_DATE + '60 days'::interval)) THEN 'VENCENDO_60_DIAS'::text
            ELSE 'NORMAL'::text
        END AS status_vencimento,
    (l.data_validade - CURRENT_DATE) AS dias_para_vencimento
   FROM ((public.lotes l
     JOIN public.produtos p ON ((l.produto_id = p.id)))
     LEFT JOIN public.estoque_localizacao el ON ((l.id = el.lote_id)))
  WHERE ((l.bloqueado = false) AND (l.data_validade IS NOT NULL))
  GROUP BY l.id, l.numero_lote, l.produto_id, p.sku, p.nome, l.data_validade
 HAVING (COALESCE(sum(el.quantidade), (0)::numeric) > (0)::numeric);


ALTER VIEW public.vw_lotes_vencimento OWNER TO postgres;

--
-- Name: vw_movimentacoes_recentes; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_movimentacoes_recentes AS
 SELECT m.id,
    m.tipo,
    m.documento,
    m.quantidade,
    m.realizada_em,
    p.sku,
    p.nome AS produto_nome,
    l.numero_lote,
    lo.codigo AS localizacao_origem,
    ld.codigo AS localizacao_destino,
    pr.nome_completo AS realizado_por_nome,
    m.observacao
   FROM (((((public.movimentacoes m
     JOIN public.produtos p ON ((m.produto_id = p.id)))
     LEFT JOIN public.lotes l ON ((m.lote_id = l.id)))
     LEFT JOIN public.localizacoes lo ON ((m.localizacao_origem_id = lo.id)))
     LEFT JOIN public.localizacoes ld ON ((m.localizacao_destino_id = ld.id)))
     LEFT JOIN public.profiles pr ON ((m.realizada_por = pr.id)))
  ORDER BY m.realizada_em DESC;


ALTER VIEW public.vw_movimentacoes_recentes OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: messages_2025_10_13; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_10_13 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_10_13 OWNER TO supabase_admin;

--
-- Name: messages_2025_10_14; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_10_14 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_10_14 OWNER TO supabase_admin;

--
-- Name: messages_2025_10_15; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_10_15 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_10_15 OWNER TO supabase_admin;

--
-- Name: messages_2025_10_16; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_10_16 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_10_16 OWNER TO supabase_admin;

--
-- Name: messages_2025_10_17; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_10_17 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_10_17 OWNER TO supabase_admin;

--
-- Name: messages_2025_10_18; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_10_18 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_10_18 OWNER TO supabase_admin;

--
-- Name: messages_2025_10_19; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_10_19 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_10_19 OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: seed_files; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.seed_files (
    path text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE supabase_migrations.seed_files OWNER TO postgres;

--
-- Name: messages_2025_10_13; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_10_13 FOR VALUES FROM ('2025-10-13 00:00:00') TO ('2025-10-14 00:00:00');


--
-- Name: messages_2025_10_14; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_10_14 FOR VALUES FROM ('2025-10-14 00:00:00') TO ('2025-10-15 00:00:00');


--
-- Name: messages_2025_10_15; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_10_15 FOR VALUES FROM ('2025-10-15 00:00:00') TO ('2025-10-16 00:00:00');


--
-- Name: messages_2025_10_16; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_10_16 FOR VALUES FROM ('2025-10-16 00:00:00') TO ('2025-10-17 00:00:00');


--
-- Name: messages_2025_10_17; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_10_17 FOR VALUES FROM ('2025-10-17 00:00:00') TO ('2025-10-18 00:00:00');


--
-- Name: messages_2025_10_18; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_10_18 FOR VALUES FROM ('2025-10-18 00:00:00') TO ('2025-10-19 00:00:00');


--
-- Name: messages_2025_10_19; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_10_19 FOR VALUES FROM ('2025-10-19 00:00:00') TO ('2025-10-20 00:00:00');


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	226b169a-a12f-41e4-b4d0-6a5783887227	{"action":"user_confirmation_requested","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-12 01:54:03.712126+00	
00000000-0000-0000-0000-000000000000	33f5278b-f10e-4d62-a00a-11f10804b7c4	{"action":"user_confirmation_requested","actor_id":"5eb030f8-c483-483e-a7fa-87e79b75ecbb","actor_username":"usuario@usuario.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-12 02:00:52.816398+00	
00000000-0000-0000-0000-000000000000	311db3d1-3899-497b-9df9-a8c0d7cdc9e4	{"action":"user_signedup","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-12 02:07:58.808633+00	
00000000-0000-0000-0000-000000000000	383cd210-a2a3-4bf4-9b2a-17eba07d523c	{"action":"login","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 02:07:58.81298+00	
00000000-0000-0000-0000-000000000000	4a90cbba-3ada-4622-8386-f39da1134763	{"action":"user_signedup","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-12 02:14:48.950233+00	
00000000-0000-0000-0000-000000000000	b6013add-8b2b-4501-b855-94cdead5d57f	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 02:14:48.994358+00	
00000000-0000-0000-0000-000000000000	93c3e568-4472-40b4-940c-f4e3a3f6652c	{"action":"logout","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 02:46:17.783481+00	
00000000-0000-0000-0000-000000000000	f7e737ee-73b0-43e6-afc3-5a19480878fe	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 02:48:14.296673+00	
00000000-0000-0000-0000-000000000000	37635ce2-7bba-4bb2-bafd-def324a5d161	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 03:06:21.580108+00	
00000000-0000-0000-0000-000000000000	472c6adf-bf56-40ca-b6d0-0d25805b8cac	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 03:06:21.59052+00	
00000000-0000-0000-0000-000000000000	af87d725-2576-414f-a52e-4a85e37c9ea7	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 03:19:37.926273+00	
00000000-0000-0000-0000-000000000000	854c6c1e-cfe6-405a-a03f-ff1476bd21bc	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 03:49:36.656661+00	
00000000-0000-0000-0000-000000000000	27244637-d79a-4fac-bd5b-c35ed82ed52b	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 03:49:36.666084+00	
00000000-0000-0000-0000-000000000000	fe3dcf2e-8d46-4ec4-b635-e17a5d1e9c0f	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 04:10:16.084162+00	
00000000-0000-0000-0000-000000000000	09110bdd-6c5c-4bc7-a2f3-c130204efe9e	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 04:21:39.98483+00	
00000000-0000-0000-0000-000000000000	6a7e5d47-24f1-491b-a0a0-bc9185201167	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 04:21:40.000159+00	
00000000-0000-0000-0000-000000000000	f6cac21a-4b74-40f0-bf2e-5af00635e795	{"action":"logout","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 04:24:34.637771+00	
00000000-0000-0000-0000-000000000000	17af7926-b763-4fbf-a10c-2acc67562ec7	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 04:26:58.666949+00	
00000000-0000-0000-0000-000000000000	979d8e81-d59f-4a2e-ae26-34f64c634e56	{"action":"logout","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 04:28:16.32946+00	
00000000-0000-0000-0000-000000000000	cbfd173d-27f2-49af-a658-1d187021323e	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 04:28:24.464665+00	
00000000-0000-0000-0000-000000000000	f22fc71f-6bc0-47ac-904b-e6322a560b2f	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 16:37:23.745791+00	
00000000-0000-0000-0000-000000000000	a6dc59fa-f182-46c0-9053-005bc8c8cb0a	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 16:57:42.693238+00	
00000000-0000-0000-0000-000000000000	c0793522-e104-41dd-aa71-9cfc067fa70b	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 16:57:42.697906+00	
00000000-0000-0000-0000-000000000000	8cb1680b-9434-4a20-a1c7-46ce3a034037	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 17:05:54.772236+00	
00000000-0000-0000-0000-000000000000	c323dc70-11b0-473c-b5b9-11f64d205d94	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 18:17:51.431168+00	
00000000-0000-0000-0000-000000000000	3568bd8e-6656-4b86-ae2c-7ccb92c295f6	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 18:17:51.442954+00	
00000000-0000-0000-0000-000000000000	9fba8501-e4a3-4bb5-b713-7ecbeb5eeda7	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 19:17:10.96042+00	
00000000-0000-0000-0000-000000000000	f7ab2894-fec6-4022-aed5-ad4d3b0e4f79	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 19:17:10.967513+00	
00000000-0000-0000-0000-000000000000	6ec7a27d-4ef8-4cae-a06f-7978c5304db5	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 20:25:08.416782+00	
00000000-0000-0000-0000-000000000000	2f363633-254d-476f-9a44-10b1498e3665	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 20:25:08.421471+00	
00000000-0000-0000-0000-000000000000	00f9ec02-a8b4-4fae-879c-c375bfc67b8d	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 20:25:32.892851+00	
00000000-0000-0000-0000-000000000000	26f94ef7-5bd8-4d9b-a57b-abedfbbe746c	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 20:25:32.893599+00	
00000000-0000-0000-0000-000000000000	861f1837-bc55-409c-af1b-003c4f0641a7	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 20:49:58.349932+00	
00000000-0000-0000-0000-000000000000	8fad8ec1-140c-427e-beea-b0b0c37caf23	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 20:49:58.360069+00	
00000000-0000-0000-0000-000000000000	7069f4d3-6cd9-44ff-99bd-cf8ada0cc99e	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 21:23:38.351822+00	
00000000-0000-0000-0000-000000000000	4cfb8e84-20c4-434d-9aa5-b3be8cf20ae0	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 21:23:38.365385+00	
00000000-0000-0000-0000-000000000000	bd606c43-c25a-47c1-96fa-a2802007b9b4	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 21:48:14.853417+00	
00000000-0000-0000-0000-000000000000	41a67669-ee69-48de-9cfc-c7868bb67d7e	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 21:48:14.871139+00	
00000000-0000-0000-0000-000000000000	13e4153e-b98f-416c-ba6c-76f69c794787	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 22:22:41.675032+00	
00000000-0000-0000-0000-000000000000	d52d6c64-1659-413d-80f9-0707bc9902a3	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 22:22:41.68315+00	
00000000-0000-0000-0000-000000000000	f608b216-cca7-455e-88da-b2364acdb75e	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 23:21:42.024328+00	
00000000-0000-0000-0000-000000000000	21353405-ab26-4565-b6e0-f00755ccf147	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 23:21:42.038696+00	
00000000-0000-0000-0000-000000000000	2872d864-4b21-4289-a9ac-d924fc2c674c	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 00:04:30.322477+00	
00000000-0000-0000-0000-000000000000	2ba9db29-fbd2-408e-b49f-48f0646bc564	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 00:04:30.333587+00	
00000000-0000-0000-0000-000000000000	7d905906-3eeb-4a5d-997a-9ce7af378c9c	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 00:19:56.418594+00	
00000000-0000-0000-0000-000000000000	a67ad71d-7e80-4daf-804d-e2dcf02bd382	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 00:19:56.433827+00	
00000000-0000-0000-0000-000000000000	625de97b-da18-42dd-bf9f-235ffeb6d116	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 01:07:32.173429+00	
00000000-0000-0000-0000-000000000000	d8a8c89e-9209-48ff-9a0b-1db4a1087995	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 01:07:32.183634+00	
00000000-0000-0000-0000-000000000000	4fcf1016-ce6b-4809-a738-efa6c021959a	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 01:36:29.798126+00	
00000000-0000-0000-0000-000000000000	61e9d13a-58d6-4474-befe-bd8a76d08e83	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 01:36:29.806449+00	
00000000-0000-0000-0000-000000000000	e0d57ceb-c0d1-4995-8198-f02118031b05	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 02:06:24.114127+00	
00000000-0000-0000-0000-000000000000	65d1288b-2a24-42af-849b-3c411ff082fc	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 02:06:24.126452+00	
00000000-0000-0000-0000-000000000000	c74822f0-763b-4889-86e7-c862d9642dec	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 02:23:54.615843+00	
00000000-0000-0000-0000-000000000000	3e0c7429-4485-4526-835f-1e0f55fe9f7d	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 02:23:54.622482+00	
00000000-0000-0000-0000-000000000000	19edb20f-64a0-42de-9c69-11879a3a83e5	{"action":"token_refreshed","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 02:39:26.063203+00	
00000000-0000-0000-0000-000000000000	521af095-e62c-4859-8534-5a475cad224c	{"action":"token_revoked","actor_id":"ed3645a9-324b-4af5-8c1f-e0724a391668","actor_username":"teste@armazemvivo.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 02:39:26.07151+00	
00000000-0000-0000-0000-000000000000	3a636f23-a8f4-43c0-838a-3b2c6d1f875f	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 02:45:27.070121+00	
00000000-0000-0000-0000-000000000000	eeab7c85-0502-477e-8ee7-826cf10d29ea	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 02:55:39.65346+00	
00000000-0000-0000-0000-000000000000	907b8e14-939e-49f5-a821-b365f77d0f48	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 22:05:11.487625+00	
00000000-0000-0000-0000-000000000000	f740c399-77bf-49e5-b6d2-14e160c7b34f	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 22:09:03.467027+00	
00000000-0000-0000-0000-000000000000	a7169a5f-5996-4880-b12a-aa88f18b76ec	{"action":"user_signedup","actor_id":"9472519d-6731-4fec-ae36-cd159b2dce12","actor_username":"igorchagas.nunes@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-13 22:14:12.591754+00	
00000000-0000-0000-0000-000000000000	fc7b80a0-c262-479e-a8ec-454ef0148c72	{"action":"login","actor_id":"9472519d-6731-4fec-ae36-cd159b2dce12","actor_username":"igorchagas.nunes@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 22:14:12.601258+00	
00000000-0000-0000-0000-000000000000	11f9ad9f-d782-4b10-b610-2b91b483d246	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 22:17:01.660445+00	
00000000-0000-0000-0000-000000000000	5d191999-30b5-4a1c-970d-f5984be726d0	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 22:18:12.088625+00	
00000000-0000-0000-0000-000000000000	003398a7-c649-44ee-ba67-38716e130711	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 22:36:02.696484+00	
00000000-0000-0000-0000-000000000000	e2df1f2c-22ea-4d39-9fef-3cccf254c33d	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 22:36:02.704129+00	
00000000-0000-0000-0000-000000000000	af31f57b-cfbc-43d7-9700-cf86dd508865	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:34:15.367289+00	
00000000-0000-0000-0000-000000000000	37b9837c-e572-4581-a134-c976808141b1	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:34:15.377723+00	
00000000-0000-0000-0000-000000000000	8ce3dc4e-61a2-455a-9a53-2db018e389c9	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:49:06.691166+00	
00000000-0000-0000-0000-000000000000	5a191f73-2a95-4b64-ab61-27cf625277c2	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:49:06.697919+00	
00000000-0000-0000-0000-000000000000	4e8a90af-f1a0-45fb-9a30-f8b34e520801	{"action":"logout","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 23:49:50.471641+00	
00000000-0000-0000-0000-000000000000	23e00244-bc73-4dfe-9adb-81fd8383f81f	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 23:50:01.162376+00	
00000000-0000-0000-0000-000000000000	8cea1621-c42c-4ad1-8ba2-e50d5dc96cea	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 00:50:48.878284+00	
00000000-0000-0000-0000-000000000000	7f5fd63a-a7f4-413e-9962-13f1e4e65126	{"action":"user_signedup","actor_id":"a003f251-e172-4cf0-952e-a498614f2bc2","actor_username":"igooo.azevedo@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-14 01:01:10.499572+00	
00000000-0000-0000-0000-000000000000	38619cc5-c6b1-48a8-9695-8fcc12fab8b0	{"action":"login","actor_id":"a003f251-e172-4cf0-952e-a498614f2bc2","actor_username":"igooo.azevedo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 01:01:10.525411+00	
00000000-0000-0000-0000-000000000000	5ff02db7-9f22-4c74-bb90-e3a975ef677c	{"action":"login","actor_id":"a003f251-e172-4cf0-952e-a498614f2bc2","actor_username":"igooo.azevedo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 01:07:57.051453+00	
00000000-0000-0000-0000-000000000000	d4c80310-fe27-4a08-91f3-351118bfc438	{"action":"login","actor_id":"a003f251-e172-4cf0-952e-a498614f2bc2","actor_username":"igooo.azevedo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 01:21:37.391367+00	
00000000-0000-0000-0000-000000000000	2714435b-e68c-4659-97fa-e035be3eb7b2	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 01:50:28.969506+00	
00000000-0000-0000-0000-000000000000	827a75cc-4218-4b52-b7cc-e79f84ea60f4	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 03:21:21.312194+00	
00000000-0000-0000-0000-000000000000	99ab2938-4162-4f51-92e5-d0a818cf5809	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 03:21:21.324151+00	
00000000-0000-0000-0000-000000000000	59e8a9de-72c9-4238-98d3-1d8d3a45a452	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 09:31:21.225002+00	
00000000-0000-0000-0000-000000000000	94d14cd8-2509-4cee-a1c5-267af480f11d	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 09:31:21.255363+00	
00000000-0000-0000-0000-000000000000	59bebf56-790c-4e6b-9d29-99bc79ccc9b4	{"action":"login","actor_id":"a003f251-e172-4cf0-952e-a498614f2bc2","actor_username":"igooo.azevedo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 18:50:58.059489+00	
00000000-0000-0000-0000-000000000000	7e4f4b24-9dc0-4deb-acb5-4c87ddc35c1a	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 20:51:37.351338+00	
00000000-0000-0000-0000-000000000000	a7f47ee0-7d2e-4dfc-8a1c-e1bcf5b4f7fd	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:59:30.386397+00	
00000000-0000-0000-0000-000000000000	6987c102-930b-4ca0-8419-555bf41b713d	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:59:30.408791+00	
00000000-0000-0000-0000-000000000000	e6ada76b-69cd-42e2-9031-621cabe793f2	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 23:38:21.027674+00	
00000000-0000-0000-0000-000000000000	5efcce8a-a0f6-44dc-97a3-c24927185b8b	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 23:42:31.873873+00	
00000000-0000-0000-0000-000000000000	66df4d14-c2d6-4487-99e7-4f209d87be4c	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 00:40:52.508556+00	
00000000-0000-0000-0000-000000000000	e24b2372-d51f-4a3e-8666-f42fb63d07f9	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 00:40:52.521377+00	
00000000-0000-0000-0000-000000000000	882bb0ed-2fa3-40d1-9a72-87fbf5a51412	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 01:13:36.886447+00	
00000000-0000-0000-0000-000000000000	50cfa661-ad59-481a-b062-08b5a701fbe4	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 01:13:36.901069+00	
00000000-0000-0000-0000-000000000000	9e62eba6-dda9-4f0b-8e00-0f92f714ab0e	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 01:39:03.750774+00	
00000000-0000-0000-0000-000000000000	f215107a-32cc-4411-ae70-faeb623fd0e5	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 01:39:03.755396+00	
00000000-0000-0000-0000-000000000000	54459ae3-6a17-45df-ae41-5061d71e6add	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 02:11:50.640338+00	
00000000-0000-0000-0000-000000000000	4c95b8ae-1d03-4aa6-9b4d-8ad643d6a5a9	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 02:11:50.666056+00	
00000000-0000-0000-0000-000000000000	72fda150-c032-4971-91f8-8340e1993c53	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 02:28:37.654132+00	
00000000-0000-0000-0000-000000000000	5a8525ed-0d46-4088-a367-346fdb9e73f9	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 11:52:10.278924+00	
00000000-0000-0000-0000-000000000000	24bc2036-b495-4b11-9136-89967861a0b8	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 11:52:10.303159+00	
00000000-0000-0000-0000-000000000000	29b32f53-6566-48da-abb7-6df3fdf8fc04	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 11:59:46.562868+00	
00000000-0000-0000-0000-000000000000	8dcd72d3-0f13-4cb9-94e9-b6bdc27aa5a3	{"action":"token_refreshed","actor_id":"a003f251-e172-4cf0-952e-a498614f2bc2","actor_username":"igooo.azevedo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 12:05:57.847337+00	
00000000-0000-0000-0000-000000000000	082537f1-f459-4b13-acc6-bcbefc353aa9	{"action":"token_revoked","actor_id":"a003f251-e172-4cf0-952e-a498614f2bc2","actor_username":"igooo.azevedo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 12:05:57.853864+00	
00000000-0000-0000-0000-000000000000	7b65ecf0-4de2-44e7-bf9c-bfcb1e944dc6	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 12:59:34.033523+00	
00000000-0000-0000-0000-000000000000	f505971c-952a-44ab-8951-d870f4a7463c	{"action":"user_signedup","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-15 13:01:23.015669+00	
00000000-0000-0000-0000-000000000000	80dd7a9b-ccfc-45e4-81f4-27fc4556156a	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 13:01:23.035617+00	
00000000-0000-0000-0000-000000000000	a920c360-2ac1-4e1b-8c16-23008c59a706	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 13:09:21.466496+00	
00000000-0000-0000-0000-000000000000	74a7dfaa-f644-442b-a6b3-ba9731aab18c	{"action":"logout","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 13:39:28.95962+00	
00000000-0000-0000-0000-000000000000	eeec4250-e133-4183-b1f5-74c9ef6f6ed2	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 13:44:38.650401+00	
00000000-0000-0000-0000-000000000000	35582480-9a82-4c25-a519-b2864b4f16d6	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 14:02:20.362627+00	
00000000-0000-0000-0000-000000000000	93aa79ae-db8d-478a-8c16-4a8123cd7a90	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 14:02:20.372471+00	
00000000-0000-0000-0000-000000000000	a8cd6b4b-c1f5-49b0-85b4-34dcdccc9526	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 14:11:56.061577+00	
00000000-0000-0000-0000-000000000000	029617f9-2dc5-4eb4-ba0d-d400daee8df3	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 14:11:56.068499+00	
00000000-0000-0000-0000-000000000000	2ac4c39a-c7bb-40f9-9f56-3749b78c010b	{"action":"logout","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 14:12:51.419392+00	
00000000-0000-0000-0000-000000000000	8ca441f0-209b-4e34-aff9-edc3ea8faa20	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 15:01:03.120764+00	
00000000-0000-0000-0000-000000000000	af147636-9bbc-461c-a3a9-4dec7fb37a1b	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 15:11:52.480282+00	
00000000-0000-0000-0000-000000000000	d80d28da-cc1b-436b-984b-e7e13dbc4fc8	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 15:32:00.434574+00	
00000000-0000-0000-0000-000000000000	ed7c7233-f2bd-41cf-b8b2-641828e0e3b0	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 15:33:54.305263+00	
00000000-0000-0000-0000-000000000000	ca1d6fca-3d8f-492d-901c-503787b62110	{"action":"logout","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 15:49:06.934501+00	
00000000-0000-0000-0000-000000000000	9fa7dccb-273c-493b-aea0-bdca633841be	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 15:52:29.40098+00	
00000000-0000-0000-0000-000000000000	c455f225-9aa9-4e09-95a1-8bef1508b367	{"action":"user_signedup","actor_id":"bfda334a-9396-4654-bbda-73b59696e540","actor_username":"igorchagas.87@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-15 16:50:18.770577+00	
00000000-0000-0000-0000-000000000000	c93dadb1-9a6f-41ec-bced-cf984c75f8e1	{"action":"login","actor_id":"bfda334a-9396-4654-bbda-73b59696e540","actor_username":"igorchagas.87@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 16:50:18.800019+00	
00000000-0000-0000-0000-000000000000	ab4ef42f-8804-41b1-a332-ef1bc5ab6631	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 16:50:27.058098+00	
00000000-0000-0000-0000-000000000000	4e17610c-33ab-4e7b-b203-2a9f35166caf	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 16:59:48.587507+00	
00000000-0000-0000-0000-000000000000	2813b465-e896-4d9b-8b3a-76547969bdc1	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 17:05:28.979358+00	
00000000-0000-0000-0000-000000000000	e9ce7291-8ad0-4ecf-93fe-2f471aab73eb	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 17:05:28.988489+00	
00000000-0000-0000-0000-000000000000	61349b93-b61b-4e18-8d24-3fb7a7b1fb57	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 17:05:34.331383+00	
00000000-0000-0000-0000-000000000000	8e939239-b871-4db7-b43b-b9b64b0752ca	{"action":"logout","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 17:18:58.596408+00	
00000000-0000-0000-0000-000000000000	479d804d-9e72-40d8-a11c-4ae58aa97a2f	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 17:19:00.889442+00	
00000000-0000-0000-0000-000000000000	71fe4d0b-18bf-45d1-9c30-8625aaaded44	{"action":"token_refreshed","actor_id":"bfda334a-9396-4654-bbda-73b59696e540","actor_username":"igorchagas.87@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 17:48:58.819041+00	
00000000-0000-0000-0000-000000000000	f7ec5f04-dc79-4f49-b187-fc72603a1a2c	{"action":"token_revoked","actor_id":"bfda334a-9396-4654-bbda-73b59696e540","actor_username":"igorchagas.87@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 17:48:58.834856+00	
00000000-0000-0000-0000-000000000000	c058af9b-5d77-482d-ada3-a11407b19fdf	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 18:01:57.827671+00	
00000000-0000-0000-0000-000000000000	8788fc7d-c19c-42b5-a535-4c86233c848d	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 18:03:52.776245+00	
00000000-0000-0000-0000-000000000000	6d045b76-8058-447e-bf9b-ee676c221efd	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 18:08:32.987491+00	
00000000-0000-0000-0000-000000000000	33146883-c138-4457-870c-ceeacbc5c657	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 18:12:02.360555+00	
00000000-0000-0000-0000-000000000000	e46ac1fd-5439-44f2-8ec6-e171c53eaafd	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 18:45:17.489374+00	
00000000-0000-0000-0000-000000000000	0bdaa000-2eb9-49d3-9ded-5966e0763774	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 18:45:17.496771+00	
00000000-0000-0000-0000-000000000000	476fef31-608e-4014-bb86-38f10e434a00	{"action":"logout","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 18:49:02.540603+00	
00000000-0000-0000-0000-000000000000	f2a4c4f3-ed03-4632-80dc-353a774265e8	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 18:49:07.662304+00	
00000000-0000-0000-0000-000000000000	2a63f3dc-3ec3-4e3d-a7c7-7da91a567d7e	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 19:07:07.529783+00	
00000000-0000-0000-0000-000000000000	1e3ce77e-6be3-4e9b-aa20-beab23a99f7d	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 19:35:56.389449+00	
00000000-0000-0000-0000-000000000000	9853da0d-5be5-4d79-98cc-3d5d65d6c952	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 20:39:28.577836+00	
00000000-0000-0000-0000-000000000000	23d51f27-ff54-4279-b7a1-d33500bc75cf	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 20:39:28.595056+00	
00000000-0000-0000-0000-000000000000	b70566d7-7033-49d5-90bd-da71111c9c67	{"action":"token_refreshed","actor_id":"bfda334a-9396-4654-bbda-73b59696e540","actor_username":"igorchagas.87@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 21:26:52.353981+00	
00000000-0000-0000-0000-000000000000	224fc3b2-c59f-42d1-bdc0-4c028cd2089e	{"action":"token_revoked","actor_id":"bfda334a-9396-4654-bbda-73b59696e540","actor_username":"igorchagas.87@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 21:26:52.368714+00	
00000000-0000-0000-0000-000000000000	e317d088-520f-40ab-9dea-8df40453f8d5	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 21:47:37.999758+00	
00000000-0000-0000-0000-000000000000	e19996b5-4cf3-4dd1-b7c4-8dc76e28356d	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 21:47:38.008899+00	
00000000-0000-0000-0000-000000000000	c153a1ec-29ae-4421-a130-686fe78491f2	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 21:47:41.057232+00	
00000000-0000-0000-0000-000000000000	4801888f-57b4-40af-a7e7-256a90e68608	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 21:48:54.534612+00	
00000000-0000-0000-0000-000000000000	189cebeb-b004-4062-84a5-c11f71a8967c	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 21:48:54.537689+00	
00000000-0000-0000-0000-000000000000	e135f287-b084-4689-aded-8137a86b9c93	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 00:43:52.29813+00	
00000000-0000-0000-0000-000000000000	5c4d45b4-684e-4622-b84d-db076d68d9cf	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 00:43:52.323939+00	
00000000-0000-0000-0000-000000000000	0a9ee72c-b6b8-40a1-8391-863f4a3860e0	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 00:47:18.888732+00	
00000000-0000-0000-0000-000000000000	47e95c85-e3ca-47c6-882e-7ba82bf17adc	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 01:19:54.572115+00	
00000000-0000-0000-0000-000000000000	f3f19107-628d-4bd8-83cd-88893782e242	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 01:19:54.575898+00	
00000000-0000-0000-0000-000000000000	6bd50ee1-4b29-482c-a92b-610e08e27305	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 01:20:39.747476+00	
00000000-0000-0000-0000-000000000000	d80d40d6-f516-4a06-b530-8ec4ca921d42	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 01:20:39.748163+00	
00000000-0000-0000-0000-000000000000	9f828ad1-7732-42bd-afe5-41b9ed5279e7	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 01:21:23.527387+00	
00000000-0000-0000-0000-000000000000	51ee2af8-0e6d-4203-85b0-cd3d6c5a53a9	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 01:58:26.669036+00	
00000000-0000-0000-0000-000000000000	1df6f50b-bbb9-448a-924d-81d091b17ad2	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 02:06:53.658155+00	
00000000-0000-0000-0000-000000000000	a7d23fcd-fdde-4c12-9108-14c2023419da	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 02:30:36.580772+00	
00000000-0000-0000-0000-000000000000	803cff3a-bdc0-4b95-b806-546d10aeb3b5	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 02:56:53.398251+00	
00000000-0000-0000-0000-000000000000	99536c51-2a38-4333-9dc8-6a102c09c35c	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 02:56:53.411869+00	
00000000-0000-0000-0000-000000000000	d90b82b7-7b16-4d74-abcc-f21609fcdaf8	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 03:13:45.830697+00	
00000000-0000-0000-0000-000000000000	2d7028b1-f58f-45af-995b-acba948fa2c4	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 03:13:45.838563+00	
00000000-0000-0000-0000-000000000000	01925ab1-ab42-4bab-a1e2-a8f91b73cfab	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 03:19:57.407001+00	
00000000-0000-0000-0000-000000000000	23a570c8-ea9d-4dba-8781-1984ba9dcda2	{"action":"token_refreshed","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 03:43:14.04302+00	
00000000-0000-0000-0000-000000000000	b7d8b86f-e747-479f-aac3-11f4a035a92d	{"action":"token_revoked","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 03:43:14.0558+00	
00000000-0000-0000-0000-000000000000	e16c7685-591b-4c79-b124-37bbac288285	{"action":"logout","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-16 03:48:03.170731+00	
00000000-0000-0000-0000-000000000000	2cabaa77-746a-4246-9c5f-c690487aa6e7	{"action":"login","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 03:51:50.414567+00	
00000000-0000-0000-0000-000000000000	71c96ad8-f141-4a33-a691-4dfcbfc61673	{"action":"logout","actor_id":"804c7b87-a206-4acd-84bf-76908a853485","actor_username":"edson.vinicius1991@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-16 03:52:16.321513+00	
00000000-0000-0000-0000-000000000000	7b984d85-ea8f-4250-90ab-3b034ea53d27	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 10:01:17.854722+00	
00000000-0000-0000-0000-000000000000	1d3f9315-60d9-49a4-afa0-105bdd85f74e	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 10:01:17.875832+00	
00000000-0000-0000-0000-000000000000	3e7b0fa9-e41f-4170-a31e-c0b56668d787	{"action":"logout","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account"}	2025-10-16 10:02:23.704093+00	
00000000-0000-0000-0000-000000000000	153d7638-8779-4a7e-82bb-ec92fc356575	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 10:02:29.13776+00	
00000000-0000-0000-0000-000000000000	3035081c-21d5-4b86-91bc-75317e2d8c6d	{"action":"login","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-16 11:46:45.624557+00	
00000000-0000-0000-0000-000000000000	735f56a4-b3fa-4687-87b9-f42764181ef3	{"action":"token_refreshed","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 15:58:37.141265+00	
00000000-0000-0000-0000-000000000000	96129f3b-2412-4a19-a761-4fc144b3d6c4	{"action":"token_revoked","actor_id":"ad4ea6d0-a4d2-4e82-b659-08e792236904","actor_username":"admin@admin.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 15:58:37.164489+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
ad4ea6d0-a4d2-4e82-b659-08e792236904	ad4ea6d0-a4d2-4e82-b659-08e792236904	{"sub": "ad4ea6d0-a4d2-4e82-b659-08e792236904", "email": "admin@admin.com", "nome_completo": "admin", "email_verified": false, "phone_verified": false}	email	2025-10-12 01:54:03.704295+00	2025-10-12 01:54:03.704354+00	2025-10-12 01:54:03.704354+00	83960f61-70b6-44f3-adca-80f31ea2562c
5eb030f8-c483-483e-a7fa-87e79b75ecbb	5eb030f8-c483-483e-a7fa-87e79b75ecbb	{"sub": "5eb030f8-c483-483e-a7fa-87e79b75ecbb", "email": "usuario@usuario.com", "nome_completo": "Usuario", "email_verified": false, "phone_verified": false}	email	2025-10-12 02:00:52.813651+00	2025-10-12 02:00:52.813699+00	2025-10-12 02:00:52.813699+00	68c63320-becb-4afd-a2c4-4cb3b2ef2bf1
ed3645a9-324b-4af5-8c1f-e0724a391668	ed3645a9-324b-4af5-8c1f-e0724a391668	{"sub": "ed3645a9-324b-4af5-8c1f-e0724a391668", "email": "teste@armazemvivo.com", "email_verified": false, "phone_verified": false}	email	2025-10-12 02:07:58.805582+00	2025-10-12 02:07:58.805638+00	2025-10-12 02:07:58.805638+00	92778f55-0b48-4e6a-a014-408e101b39e7
804c7b87-a206-4acd-84bf-76908a853485	804c7b87-a206-4acd-84bf-76908a853485	{"sub": "804c7b87-a206-4acd-84bf-76908a853485", "email": "edson.vinicius1991@gmail.com", "nome_completo": "Edson Vinicius Oliveira dos Santos", "email_verified": false, "phone_verified": false}	email	2025-10-12 02:14:48.930278+00	2025-10-12 02:14:48.930332+00	2025-10-12 02:14:48.930332+00	da67ba08-00dd-48d0-882e-72ac1bb79d49
9472519d-6731-4fec-ae36-cd159b2dce12	9472519d-6731-4fec-ae36-cd159b2dce12	{"sub": "9472519d-6731-4fec-ae36-cd159b2dce12", "email": "igorchagas.nunes@gmail.com", "nome_completo": "Igor", "email_verified": false, "phone_verified": false}	email	2025-10-13 22:14:12.582179+00	2025-10-13 22:14:12.582279+00	2025-10-13 22:14:12.582279+00	391853d8-73c5-4209-9671-07e96e287142
a003f251-e172-4cf0-952e-a498614f2bc2	a003f251-e172-4cf0-952e-a498614f2bc2	{"sub": "a003f251-e172-4cf0-952e-a498614f2bc2", "email": "igooo.azevedo@gmail.com", "nome_completo": "Igo azevedo", "email_verified": false, "phone_verified": false}	email	2025-10-14 01:01:10.465305+00	2025-10-14 01:01:10.466978+00	2025-10-14 01:01:10.466978+00	d24208e0-d003-4e13-9740-f1eac6fffe8f
bfda334a-9396-4654-bbda-73b59696e540	bfda334a-9396-4654-bbda-73b59696e540	{"sub": "bfda334a-9396-4654-bbda-73b59696e540", "email": "igorchagas.87@gmail.com", "nome_completo": "Igor Nunes Chagas", "email_verified": false, "phone_verified": false}	email	2025-10-15 16:50:18.75073+00	2025-10-15 16:50:18.750793+00	2025-10-15 16:50:18.750793+00	16ca6189-42cf-4a09-8431-c8b00b412f83
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
b8087d9a-e354-4ad0-8835-1bc9e809d08b	2025-10-12 02:07:58.832226+00	2025-10-12 02:07:58.832226+00	password	05baf9e8-a8f9-4226-b68d-e7f62fde1e64
4ea846e9-f754-4d50-877f-aac64875fe71	2025-10-13 22:14:12.612672+00	2025-10-13 22:14:12.612672+00	password	05567e4e-7ad0-4215-aefb-9e1b87f36cd2
4fe58460-ccf6-4376-be3e-d5a6d2bc7d57	2025-10-14 01:01:10.5446+00	2025-10-14 01:01:10.5446+00	password	c2d38203-dfb1-445b-9f73-2b775b89c5ba
40fb5f21-a046-4e40-9a46-2dfb505dc84b	2025-10-14 01:07:57.067592+00	2025-10-14 01:07:57.067592+00	password	bec421fa-284b-46a7-9337-08937c03db70
d7bab708-339d-42ec-bc9a-cc0dcda46c98	2025-10-14 01:21:37.444694+00	2025-10-14 01:21:37.444694+00	password	f3217122-ac2b-4e9d-b079-06164d7d6969
703b6876-a855-497e-b589-01f6a4658f37	2025-10-14 18:50:58.163844+00	2025-10-14 18:50:58.163844+00	password	cb9bbbe1-2875-4b0b-b058-4c33993d9bfe
7e06a45d-11d2-4651-91d8-6e027bb925a2	2025-10-15 16:50:18.831433+00	2025-10-15 16:50:18.831433+00	password	cd6a5f44-8ef3-4118-9af3-dc5f14696280
a7f8ae58-f04a-43bf-a0dd-b620df7887fe	2025-10-16 10:02:29.152177+00	2025-10-16 10:02:29.152177+00	password	077a99d8-a505-47fd-9257-d5154da4ea70
8d46186b-3e82-422c-849f-474f9c468183	2025-10-16 11:46:45.704824+00	2025-10-16 11:46:45.704824+00	password	1b6a4a6f-b501-49ed-b3d1-b9de0701e147
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
6d4ab4cc-8f48-4e58-8f77-be1dcfed3ea8	5eb030f8-c483-483e-a7fa-87e79b75ecbb	confirmation_token	c2fc56045f3015ed9a7dafd2ff6bd079cd02ed195071e6d1814b8651	usuario@usuario.com	2025-10-12 02:00:55.250693	2025-10-12 02:00:55.250693
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	1	oaje7unl4hzy	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-12 02:07:58.821243+00	2025-10-12 03:06:21.592608+00	\N	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	4	ckewvgwcz4po	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-12 03:06:21.602838+00	2025-10-12 04:21:40.000842+00	oaje7unl4hzy	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	8	vt4h5rth66hi	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-12 04:21:40.012655+00	2025-10-12 16:57:42.698586+00	ckewvgwcz4po	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	48	cwrfhelx3ckn	a003f251-e172-4cf0-952e-a498614f2bc2	t	2025-10-14 18:50:58.128262+00	2025-10-15 12:05:57.854945+00	\N	703b6876-a855-497e-b589-01f6a4658f37
00000000-0000-0000-0000-000000000000	60	b4n3diuoyab5	a003f251-e172-4cf0-952e-a498614f2bc2	f	2025-10-15 12:05:57.859764+00	2025-10-15 12:05:57.859764+00	cwrfhelx3ckn	703b6876-a855-497e-b589-01f6a4658f37
00000000-0000-0000-0000-000000000000	106	nsv7453flznm	ad4ea6d0-a4d2-4e82-b659-08e792236904	f	2025-10-16 11:46:45.681371+00	2025-10-16 11:46:45.681371+00	\N	8d46186b-3e82-422c-849f-474f9c468183
00000000-0000-0000-0000-000000000000	105	ugrqpujffh32	ad4ea6d0-a4d2-4e82-b659-08e792236904	t	2025-10-16 10:02:29.148362+00	2025-10-16 15:58:37.165739+00	\N	a7f8ae58-f04a-43bf-a0dd-b620df7887fe
00000000-0000-0000-0000-000000000000	107	r6illxomrdz7	ad4ea6d0-a4d2-4e82-b659-08e792236904	f	2025-10-16 15:58:37.185097+00	2025-10-16 15:58:37.185097+00	ugrqpujffh32	a7f8ae58-f04a-43bf-a0dd-b620df7887fe
00000000-0000-0000-0000-000000000000	12	r42d5l4gkx3w	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-12 16:57:42.70481+00	2025-10-12 20:49:58.360721+00	vt4h5rth66hi	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	18	7hawoymikknt	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-12 20:49:58.368815+00	2025-10-12 21:48:14.872314+00	r42d5l4gkx3w	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	20	6vocuu3pbwwj	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-12 21:48:14.882423+00	2025-10-13 00:04:30.336624+00	7hawoymikknt	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	23	lpjmaxhy4pee	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-13 00:04:30.345043+00	2025-10-13 01:36:29.808298+00	6vocuu3pbwwj	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	72	3ywaedv2zvld	bfda334a-9396-4654-bbda-73b59696e540	t	2025-10-15 16:50:18.818191+00	2025-10-15 17:48:58.836486+00	\N	7e06a45d-11d2-4651-91d8-6e027bb925a2
00000000-0000-0000-0000-000000000000	26	ioz73gvcxoer	ed3645a9-324b-4af5-8c1f-e0724a391668	t	2025-10-13 01:36:29.8238+00	2025-10-13 02:39:26.07225+00	lpjmaxhy4pee	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	29	l63mzmez4q23	ed3645a9-324b-4af5-8c1f-e0724a391668	f	2025-10-13 02:39:26.082773+00	2025-10-13 02:39:26.082773+00	ioz73gvcxoer	b8087d9a-e354-4ad0-8835-1bc9e809d08b
00000000-0000-0000-0000-000000000000	34	ur2hh5cjtb5n	9472519d-6731-4fec-ae36-cd159b2dce12	f	2025-10-13 22:14:12.603964+00	2025-10-13 22:14:12.603964+00	\N	4ea846e9-f754-4d50-877f-aac64875fe71
00000000-0000-0000-0000-000000000000	78	vjxwvcofp65y	bfda334a-9396-4654-bbda-73b59696e540	t	2025-10-15 17:48:58.855947+00	2025-10-15 21:26:52.369979+00	3ywaedv2zvld	7e06a45d-11d2-4651-91d8-6e027bb925a2
00000000-0000-0000-0000-000000000000	88	eppsftte4zsq	bfda334a-9396-4654-bbda-73b59696e540	f	2025-10-15 21:26:52.378982+00	2025-10-15 21:26:52.378982+00	vjxwvcofp65y	7e06a45d-11d2-4651-91d8-6e027bb925a2
00000000-0000-0000-0000-000000000000	42	sjacfi3m3gsk	a003f251-e172-4cf0-952e-a498614f2bc2	f	2025-10-14 01:01:10.534311+00	2025-10-14 01:01:10.534311+00	\N	4fe58460-ccf6-4376-be3e-d5a6d2bc7d57
00000000-0000-0000-0000-000000000000	43	kqymrrqvsm34	a003f251-e172-4cf0-952e-a498614f2bc2	f	2025-10-14 01:07:57.057031+00	2025-10-14 01:07:57.057031+00	\N	40fb5f21-a046-4e40-9a46-2dfb505dc84b
00000000-0000-0000-0000-000000000000	44	zly4hdrkbyva	a003f251-e172-4cf0-952e-a498614f2bc2	f	2025-10-14 01:21:37.419495+00	2025-10-14 01:21:37.419495+00	\N	d7bab708-339d-42ec-bc9a-cc0dcda46c98
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id) FROM stdin;
8d46186b-3e82-422c-849f-474f9c468183	ad4ea6d0-a4d2-4e82-b659-08e792236904	2025-10-16 11:46:45.652554+00	2025-10-16 11:46:45.652554+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Trae/1.100.3 Chrome/132.0.6834.210 Electron/34.5.1 Safari/537.36	168.205.175.183	\N	\N
a7f8ae58-f04a-43bf-a0dd-b620df7887fe	ad4ea6d0-a4d2-4e82-b659-08e792236904	2025-10-16 10:02:29.14239+00	2025-10-16 15:58:37.209906+00	\N	aal1	\N	2025-10-16 15:58:37.209217	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36	168.205.175.183	\N	\N
4ea846e9-f754-4d50-877f-aac64875fe71	9472519d-6731-4fec-ae36-cd159b2dce12	2025-10-13 22:14:12.602028+00	2025-10-13 22:14:12.602028+00	\N	aal1	\N	\N	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	148.222.216.44	\N	\N
703b6876-a855-497e-b589-01f6a4658f37	a003f251-e172-4cf0-952e-a498614f2bc2	2025-10-14 18:50:58.088355+00	2025-10-15 12:05:57.868796+00	\N	aal1	\N	2025-10-15 12:05:57.868271	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0	187.32.196.241	\N	\N
4fe58460-ccf6-4376-be3e-d5a6d2bc7d57	a003f251-e172-4cf0-952e-a498614f2bc2	2025-10-14 01:01:10.528087+00	2025-10-14 01:01:10.528087+00	\N	aal1	\N	\N	Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1	168.197.237.195	\N	\N
40fb5f21-a046-4e40-9a46-2dfb505dc84b	a003f251-e172-4cf0-952e-a498614f2bc2	2025-10-14 01:07:57.054933+00	2025-10-14 01:07:57.054933+00	\N	aal1	\N	\N	Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1	168.197.237.195	\N	\N
d7bab708-339d-42ec-bc9a-cc0dcda46c98	a003f251-e172-4cf0-952e-a498614f2bc2	2025-10-14 01:21:37.410188+00	2025-10-14 01:21:37.410188+00	\N	aal1	\N	\N	Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1	168.197.237.195	\N	\N
b8087d9a-e354-4ad0-8835-1bc9e809d08b	ed3645a9-324b-4af5-8c1f-e0724a391668	2025-10-12 02:07:58.813625+00	2025-10-13 02:39:26.09449+00	\N	aal1	\N	2025-10-13 02:39:26.094411	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Trae/1.100.3 Chrome/132.0.6834.210 Electron/34.5.1 Safari/537.36	168.205.175.183	\N	\N
7e06a45d-11d2-4651-91d8-6e027bb925a2	bfda334a-9396-4654-bbda-73b59696e540	2025-10-15 16:50:18.800819+00	2025-10-15 21:26:52.394729+00	\N	aal1	\N	2025-10-15 21:26:52.39409	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0	149.19.172.173	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	5eb030f8-c483-483e-a7fa-87e79b75ecbb	authenticated	authenticated	usuario@usuario.com	$2a$10$xLW6J3CSD8QEhd.naP7o4OHEjpVbnI1rCjlNKsvEYPHj8YHZ2zHZK	\N	\N	c2fc56045f3015ed9a7dafd2ff6bd079cd02ed195071e6d1814b8651	2025-10-12 02:00:52.817113+00		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"sub": "5eb030f8-c483-483e-a7fa-87e79b75ecbb", "email": "usuario@usuario.com", "nome_completo": "Usuario", "email_verified": false, "phone_verified": false}	\N	2025-10-12 02:00:52.808217+00	2025-10-12 02:00:55.248773+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	804c7b87-a206-4acd-84bf-76908a853485	authenticated	authenticated	edson.vinicius1991@gmail.com	$2a$10$WYezut3shiQYFap1RemDsOUpjX5gpGlfcv78mThe5IdgHvJDTPuJu	2025-10-12 02:14:48.967491+00	\N		\N		\N			\N	2025-10-16 03:51:50.415622+00	{"provider": "email", "providers": ["email"]}	{"sub": "804c7b87-a206-4acd-84bf-76908a853485", "email": "edson.vinicius1991@gmail.com", "nome_completo": "Edson Vinicius Oliveira dos Santos", "email_verified": true, "phone_verified": false}	\N	2025-10-12 02:14:48.870129+00	2025-10-16 03:51:50.423905+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9472519d-6731-4fec-ae36-cd159b2dce12	authenticated	authenticated	igorchagas.nunes@gmail.com	$2a$10$WfCFMcV6nBQsgGoe5OF8iuQInl5q9oPtK8TbMboLq7Ip9q0Oq6LAO	2025-10-13 22:14:12.594557+00	\N		\N		\N			\N	2025-10-13 22:14:12.601898+00	{"provider": "email", "providers": ["email"]}	{"sub": "9472519d-6731-4fec-ae36-cd159b2dce12", "email": "igorchagas.nunes@gmail.com", "nome_completo": "Igor", "email_verified": true, "phone_verified": false}	\N	2025-10-13 22:14:12.558895+00	2025-10-13 22:14:12.612167+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ed3645a9-324b-4af5-8c1f-e0724a391668	authenticated	authenticated	teste@armazemvivo.com	$2a$10$PbA0LTOdc4iZ/VwgYupUR.qFN7vzk3E/f1b24rgZVBJkZxtbfkwaS	2025-10-12 02:07:58.809434+00	\N		\N		\N			\N	2025-10-12 02:07:58.813542+00	{"provider": "email", "providers": ["email"]}	{"sub": "ed3645a9-324b-4af5-8c1f-e0724a391668", "email": "teste@armazemvivo.com", "email_verified": true, "phone_verified": false}	\N	2025-10-12 02:07:58.792233+00	2025-10-13 02:39:26.088439+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	bfda334a-9396-4654-bbda-73b59696e540	authenticated	authenticated	igorchagas.87@gmail.com	$2a$10$HdW2DbAia6SJ604LXF6pmeZ9h.bbATCydKqsAVd22a2oJOX2MQbjW	2025-10-15 16:50:18.781543+00	\N		\N		\N			\N	2025-10-15 16:50:18.800734+00	{"provider": "email", "providers": ["email"]}	{"sub": "bfda334a-9396-4654-bbda-73b59696e540", "email": "igorchagas.87@gmail.com", "nome_completo": "Igor Nunes Chagas", "email_verified": true, "phone_verified": false}	\N	2025-10-15 16:50:18.69744+00	2025-10-15 21:26:52.385416+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a003f251-e172-4cf0-952e-a498614f2bc2	authenticated	authenticated	igooo.azevedo@gmail.com	$2a$10$ETcHorVgB.NUsHJYrgYsSuePSBLgumfvA/CmhEiPIJjcJnP9hJ4CG	2025-10-14 01:01:10.506418+00	\N		\N		\N			\N	2025-10-14 18:50:58.088231+00	{"provider": "email", "providers": ["email"]}	{"sub": "a003f251-e172-4cf0-952e-a498614f2bc2", "email": "igooo.azevedo@gmail.com", "nome_completo": "Igo azevedo", "email_verified": true, "phone_verified": false}	\N	2025-10-14 01:01:10.430189+00	2025-10-15 12:05:57.864243+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ad4ea6d0-a4d2-4e82-b659-08e792236904	authenticated	authenticated	admin@admin.com	$2a$10$O.NKutBHzoelm1bEBXMvteYsRgw/1W6pECNu/tvhsjPxyUo9njlRC	2025-10-15 13:01:23.016655+00	\N		2025-10-12 01:54:03.719209+00		\N			\N	2025-10-16 11:46:45.652459+00	{"provider": "email", "providers": ["email"]}	{"sub": "ad4ea6d0-a4d2-4e82-b659-08e792236904", "email": "admin@admin.com", "nome_completo": "admin", "email_verified": true, "phone_verified": false}	\N	2025-10-12 01:54:03.681927+00	2025-10-16 15:58:37.198424+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: alertas_estoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alertas_estoque (id, produto_id, tipo_alerta, nivel_criticidade, quantidade_atual, quantidade_referencia, mensagem, ativo, data_criacao, data_resolucao, resolvido_por, observacoes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: almoxarifados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.almoxarifados (id, codigo, nome, endereco, ativo, created_at, updated_at) FROM stdin;
05d76bd6-2b76-42f2-a60a-52feea6d3265	ALM-001	Almoxarifado Central	Rua Principal, 100 - Galpão A	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
82922b1d-0a9b-4a75-a1cc-60e2a1bbd5f5	ALM-002	Almoxarifado Secundário	Rua Secundária, 200 - Galpão B	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
4d9e13b5-90c1-491a-bd2b-3c028f9f52cc	ALM-003	Almoxarifado Refrigerado	Rua dos Fundos, 300 - Câmara Fria	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
\.


--
-- Data for Name: estoque_localizacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estoque_localizacao (id, produto_id, localizacao_id, lote_id, quantidade, created_at, updated_at, reservado) FROM stdin;
9c40bd5a-7aea-41fb-b057-fb6c8ab608f9	08078cf4-8d6c-49b8-a87e-0bd2da481f10	65e1a762-63fa-4bac-9ad1-e11304c1479b	\N	20.00	2025-10-12 21:12:19.95141+00	2025-10-12 21:12:19.95141+00	0
8fa30353-765e-42aa-a709-5ba114caef2c	f00d0830-ddeb-46bd-8731-97cac655da0d	076f6933-51c2-4945-98e0-22310f85301d	\N	3.00	2025-10-12 21:12:58.928126+00	2025-10-12 21:12:58.928126+00	0
ea840a33-19a8-4808-86d1-9c6ec2a1f072	08078cf4-8d6c-49b8-a87e-0bd2da481f10	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	\N	150.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
c32a148c-8719-460f-b7e0-cc523f18fa6a	a8c946ed-1339-48b2-8216-d8ad0701e80f	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	da1b49ca-35a8-464f-9a88-09af924bf4d1	90.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
b5decf77-ef50-4316-9a6d-67cdc92c717f	202d8959-a9a7-4d56-acf5-b9cd1f82347a	6519449b-6bc8-4853-bfc3-4fa11d870690	\N	75.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
4829c57b-5e8a-4c9c-b2a3-8f1ba4368ba9	27035690-aa0f-44bc-8fbc-c56246cf9c35	6519449b-6bc8-4853-bfc3-4fa11d870690	a4b2bf36-138a-45be-8949-310d874a6e21	45.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
9915c7b1-ec4b-4d4e-91a9-a688b1a785e1	102fc588-6bac-4ef1-b66b-24617a7c9341	2d7af078-2d3a-429e-a157-9de798fa3726	579a5a58-8e7f-4607-98b2-80f5c4e3770f	3500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
9ae50a2f-7bc1-4152-80be-6aa69815e992	2e20ccfb-9eea-4fa3-904a-2840b462406d	caee9923-c48a-42be-982d-4528c5b733e2	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	2000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
3a996057-3bb2-4b93-8c9a-f710b33b5753	102fc588-6bac-4ef1-b66b-24617a7c9341	caee9923-c48a-42be-982d-4528c5b733e2	579a5a58-8e7f-4607-98b2-80f5c4e3770f	2000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
2dacc4ec-ac44-4faa-bcb3-37fcd38451b3	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	0debd13f-1eea-4021-a6a8-41f407649b8e	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	8000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
1877f879-f4c6-4b36-ab4e-b55eb1b73da3	cb6ca7e3-91b6-43c3-91f9-174a95464053	35960b5b-ec34-4fc0-885f-851118dfd271	9e3ab036-0473-48fc-bd64-94c5d83875cd	15000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
f27d751f-0a07-457d-bf2d-5804f4f0ff9d	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	35960b5b-ec34-4fc0-885f-851118dfd271	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	5500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
1aa1cfc5-54fc-4538-a988-5e9ae36754e1	ba7a006b-2bfc-4fbe-bc64-55c1f7ca7711	c2c3ea34-d0cc-4688-8608-4eb9933685c0	\N	7000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
cf4da8dc-a1e5-4fa8-9ab0-69f1a781e325	55ec3514-8325-4b2c-b996-5423457bd2d7	2cf73d1b-54c3-4457-b643-b4ac7c1deb21	\N	8.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
9362deb7-8122-4683-ae3e-b3ce84505914	61b6e8bd-e1be-4ebf-bec9-c7881192e98e	2cf73d1b-54c3-4457-b643-b4ac7c1deb21	c27b1c29-39f0-424e-a34f-f71f97ed1938	35.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
edd1a5a7-1718-4661-a90b-2b5257260339	f00d0830-ddeb-46bd-8731-97cac655da0d	2cf73d1b-54c3-4457-b643-b4ac7c1deb21	\N	45.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
959ed71a-507a-4ae2-80e7-09e2025cc2c6	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	c810227a-b046-4383-aea7-6c8a2d0e5801	\N	22.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
0e2d4d6b-a296-45e5-b92c-5c8a6de39756	60c76d84-57d6-4066-9e68-114bedee3319	c810227a-b046-4383-aea7-6c8a2d0e5801	\N	18.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
213f1c75-9cde-434a-b176-f0a15c3305a8	f00d0830-ddeb-46bd-8731-97cac655da0d	c810227a-b046-4383-aea7-6c8a2d0e5801	\N	20.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
c64d9946-f397-42e9-a082-693859f6c311	2e20ccfb-9eea-4fa3-904a-2840b462406d	ab862da3-c8f7-4aa4-b5de-136de198f9d4	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	1500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
8b3d72ab-95a1-4afe-9234-fde1f6f9f574	602cae36-a6f3-4d77-9fc6-e73fd16c6485	8b29a391-dd81-4c97-adbb-d468ed12a26e	\N	15.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
c2f0cb27-a0da-44ee-900f-82ecae2da86e	4e83eb41-e8b0-4515-a748-fe00271dafb2	914e5fe9-5e8a-485c-b40d-c499a82a939b	\N	35.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
0c2ee8a2-e125-4d62-b308-105207d5fec3	4bd8c371-05c8-44f7-9088-beba5c017de7	914e5fe9-5e8a-485c-b40d-c499a82a939b	\N	18000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
6dfea0bd-cfa9-4a41-bcaa-176f189d3e7f	43d62f0f-e866-4e1f-9e66-3afa8daa3ec1	dc224e5f-4f76-48a9-870a-5111059717ec	\N	120.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
a669958a-9bf2-4127-8fc9-0141c0b2663a	3e44bb57-44a2-4643-9ee3-8be89536c490	dc224e5f-4f76-48a9-870a-5111059717ec	\N	60.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
42638545-2f61-4372-88fc-2e23a95a4c5c	80c4120a-5b07-4748-bc8f-f551049adef1	dc224e5f-4f76-48a9-870a-5111059717ec	\N	8500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
e20c6467-738f-471c-ab52-bde9e47a8682	b01660de-f0d1-4733-bdf9-71c36eabe2e3	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	e0e6ad6d-8fe7-49ef-8329-66c4be926f88	500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
f2063414-cac8-42b0-a4bd-440cdf133f0d	1bb621e9-f8b6-4052-8018-0cf395e08594	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	250.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
e32efc83-6062-4838-b3f1-ec9de35b985b	f970eca6-c7ec-4c39-927b-52982e5d7285	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	681413d3-5f96-4b27-81c2-52e2a3e03e4a	22000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
9b7ad047-c09e-4ad2-8a04-230ad9b75a24	cb6ca7e3-91b6-43c3-91f9-174a95464053	7e317a86-3eff-4a08-a2d3-4681eaa6edcb	9e3ab036-0473-48fc-bd64-94c5d83875cd	18000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
8d459aa0-a68f-45e3-8243-5a84cc681d60	102fc588-6bac-4ef1-b66b-24617a7c9341	7e317a86-3eff-4a08-a2d3-4681eaa6edcb	579a5a58-8e7f-4607-98b2-80f5c4e3770f	1500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
36fd9d85-5bf9-47e8-929d-cf650e370df8	f8ceccae-fe83-47d0-aeed-5391ed316227	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	\N	5.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
dbb2c34f-d6c4-48a2-813d-813159771e2a	4e83eb41-e8b0-4515-a748-fe00271dafb2	076f6933-51c2-4945-98e0-22310f85301d	\N	20.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
226fd009-47b0-4129-a215-2a69851bb7ed	cb6ca7e3-91b6-43c3-91f9-174a95464053	076f6933-51c2-4945-98e0-22310f85301d	9e3ab036-0473-48fc-bd64-94c5d83875cd	10000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
a54065da-44f6-421b-ba53-75a4969cd78d	2e20ccfb-9eea-4fa3-904a-2840b462406d	076f6933-51c2-4945-98e0-22310f85301d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	900.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
d56e1f5b-7b4b-41f1-9880-1066a6c605b1	43d62f0f-e866-4e1f-9e66-3afa8daa3ec1	65e1a762-63fa-4bac-9ad1-e11304c1479b	\N	80.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
29643818-7ec6-416c-88f4-a3b2f99aab53	4bd8c371-05c8-44f7-9088-beba5c017de7	65e1a762-63fa-4bac-9ad1-e11304c1479b	\N	15000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
9a10cd51-bfe8-4bce-87f9-6c4f557ee0c1	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	65e1a762-63fa-4bac-9ad1-e11304c1479b	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	4500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
9e8b8486-558b-4644-90bd-ea1b2e759b18	b01660de-f0d1-4733-bdf9-71c36eabe2e3	b323540c-48e1-4f5f-a12f-bb4adbff9b22	e0e6ad6d-8fe7-49ef-8329-66c4be926f88	450.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
ff7fec09-2082-4af7-af2b-3442f95cc30e	1bb621e9-f8b6-4052-8018-0cf395e08594	b323540c-48e1-4f5f-a12f-bb4adbff9b22	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	150.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
41a898df-12ec-47c3-b123-3f94919a3e99	80c4120a-5b07-4748-bc8f-f551049adef1	b323540c-48e1-4f5f-a12f-bb4adbff9b22	\N	6500.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
47769efc-7f56-42a4-bbf5-3af065118d44	602cae36-a6f3-4d77-9fc6-e73fd16c6485	b323540c-48e1-4f5f-a12f-bb4adbff9b22	\N	10.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
d1f486aa-943c-47d2-a125-c05dcc1196a8	3e44bb57-44a2-4643-9ee3-8be89536c490	cb2569a9-bb62-448e-a13e-d80706bcda47	\N	40.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
33bc78a2-ea66-4a49-8a9e-2cdc5884a2c9	ba7a006b-2bfc-4fbe-bc64-55c1f7ca7711	cb2569a9-bb62-448e-a13e-d80706bcda47	\N	5000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
6cde0535-8c34-46cf-8108-88b1f03dd161	f00d0830-ddeb-46bd-8731-97cac655da0d	cb2569a9-bb62-448e-a13e-d80706bcda47	\N	35.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
d80fb206-4434-4a1b-8a21-02d26dd4490a	f970eca6-c7ec-4c39-927b-52982e5d7285	9beaf62d-d6f9-4968-911b-bfb65cb1efad	681413d3-5f96-4b27-81c2-52e2a3e03e4a	26000.00	2025-10-12 21:21:35.703672+00	2025-10-12 21:21:35.703672+00	0
\.


--
-- Data for Name: historico_estoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historico_estoque (id, produto_id, lote_id, localizacao_id, quantidade_anterior, quantidade_nova, diferenca, tipo_operacao, documento_referencia, usuario_id, data_operacao, observacoes, created_at) FROM stdin;
\.


--
-- Data for Name: localizacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.localizacoes (id, almoxarifado_id, codigo, rua, prateleira, nivel, box, tipo, capacidade_maxima, ativo, created_at, updated_at, descricao, capacidade_peso, altura, largura, profundidade, temperatura_min, temperatura_max, observacoes) FROM stdin;
1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	4d9e13b5-90c1-491a-bd2b-3c028f9f52cc	A3-P1-N1	A3	P1	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	50.0	\N	\N	\N	\N	\N	\N
6519449b-6bc8-4853-bfc3-4fa11d870690	4d9e13b5-90c1-491a-bd2b-3c028f9f52cc	A3-P1-N2	A3	P1	N2	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	50.0	\N	\N	\N	\N	\N	\N
caee9923-c48a-42be-982d-4528c5b733e2	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P1-N2	A1	P1	N2	\N	bulk	10.00	t	2025-10-12 20:24:04.16418+00	2025-10-14 21:31:43.022+00	\N	100	10	10	9.74	10	20	\N
2d7af078-2d3a-429e-a157-9de798fa3726	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P1-N1	A1	P1	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
ffe62c89-effa-4db1-9818-a610b71b0a44	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P1-N3	A1	P1	N3	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
0debd13f-1eea-4021-a6a8-41f407649b8e	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P2-N1	A1	P2	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
35960b5b-ec34-4fc0-885f-851118dfd271	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P2-N2	A1	P2	N2	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
c2c3ea34-d0cc-4688-8608-4eb9933685c0	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P2-N3	A1	P2	N3	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
2cf73d1b-54c3-4457-b643-b4ac7c1deb21	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P3-N1	A1	P3	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	150.0	\N	\N	\N	\N	\N	\N
c810227a-b046-4383-aea7-6c8a2d0e5801	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P3-N2	A1	P3	N2	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	150.0	\N	\N	\N	\N	\N	\N
ab862da3-c8f7-4aa4-b5de-136de198f9d4	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P3-N3	A1	P3	N3	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	150.0	\N	\N	\N	\N	\N	\N
8b29a391-dd81-4c97-adbb-d468ed12a26e	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P3-N4	A1	P3	N4	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	150.0	\N	\N	\N	\N	\N	\N
914e5fe9-5e8a-485c-b40d-c499a82a939b	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P4-N1	A1	P4	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	200.0	\N	\N	\N	\N	\N	\N
dc224e5f-4f76-48a9-870a-5111059717ec	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P4-N2	A1	P4	N2	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	200.0	\N	\N	\N	\N	\N	\N
c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P4-N3	A1	P4	N3	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	200.0	\N	\N	\N	\N	\N	\N
7e317a86-3eff-4a08-a2d3-4681eaa6edcb	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P5-N1	A1	P5	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	250.0	\N	\N	\N	\N	\N	\N
e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	05d76bd6-2b76-42f2-a60a-52feea6d3265	A1-P5-N2	A1	P5	N2	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	250.0	\N	\N	\N	\N	\N	\N
076f6933-51c2-4945-98e0-22310f85301d	82922b1d-0a9b-4a75-a1cc-60e2a1bbd5f5	A2-P1-N1	A2	P1	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
65e1a762-63fa-4bac-9ad1-e11304c1479b	82922b1d-0a9b-4a75-a1cc-60e2a1bbd5f5	A2-P1-N2	A2	P1	N2	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
b323540c-48e1-4f5f-a12f-bb4adbff9b22	82922b1d-0a9b-4a75-a1cc-60e2a1bbd5f5	A2-P2-N1	A2	P2	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
cb2569a9-bb62-448e-a13e-d80706bcda47	82922b1d-0a9b-4a75-a1cc-60e2a1bbd5f5	A2-P2-N2	A2	P2	N2	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	100.0	\N	\N	\N	\N	\N	\N
9beaf62d-d6f9-4968-911b-bfb65cb1efad	82922b1d-0a9b-4a75-a1cc-60e2a1bbd5f5	A2-P3-N1	A2	P3	N1	\N	bulk	\N	t	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00	\N	200.0	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: lotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lotes (id, produto_id, numero_lote, data_fabricacao, data_validade, quantidade_inicial, quantidade_atual, bloqueado, motivo_bloqueio, created_at, updated_at) FROM stdin;
579a5a58-8e7f-4607-98b2-80f5c4e3770f	102fc588-6bac-4ef1-b66b-24617a7c9341	LOTE-ELE001-2024-001	2024-01-15	\N	10000.00	8500.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	2e20ccfb-9eea-4fa3-904a-2840b462406d	LOTE-ELE002-2024-001	2024-01-15	\N	5000.00	4400.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	LOTE-ELE003-2024-001	2024-01-16	\N	20000.00	18000.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
9e3ab036-0473-48fc-bd64-94c5d83875cd	cb6ca7e3-91b6-43c3-91f9-174a95464053	LOTE-FIX001-2024-001	2024-01-10	\N	50000.00	45000.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
681413d3-5f96-4b27-81c2-52e2a3e03e4a	f970eca6-c7ec-4c39-927b-52982e5d7285	LOTE-FIX002-2024-001	2024-01-10	\N	50000.00	48000.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
c27b1c29-39f0-424e-a34f-f71f97ed1938	61b6e8bd-e1be-4ebf-bec9-c7881192e98e	LOTE-FER001-2024-001	2024-01-05	\N	100.00	85.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
510a7a70-19e9-4f14-8f2a-cf6b8f70c712	1bb621e9-f8b6-4052-8018-0cf395e08594	LOTE-MAT001-2024-001	2024-01-20	\N	500.00	400.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
e0e6ad6d-8fe7-49ef-8329-66c4be926f88	b01660de-f0d1-4733-bdf9-71c36eabe2e3	LOTE-MAT005-2024-001	2024-01-25	2025-01-25	1000.00	950.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
da1b49ca-35a8-464f-9a88-09af924bf4d1	a8c946ed-1339-48b2-8216-d8ad0701e80f	LOTE-QUI001-2024-001	2024-01-18	2025-01-18	200.00	185.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
a4b2bf36-138a-45be-8949-310d874a6e21	27035690-aa0f-44bc-8fbc-c56246cf9c35	LOTE-QUI002-2024-001	2024-01-22	2026-01-22	100.00	90.00	f	\N	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
d450a3a8-449b-4a26-b290-1a8dde44072f	602cae36-a6f3-4d77-9fc6-e73fd16c6485	LOTE-ELE004-2025-010	2025-10-01	\N	50.00	48.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
9d186c6c-613e-4f03-97e3-0d0d37854a63	f00d0830-ddeb-46bd-8731-97cac655da0d	LOTE-ELE005-2025-010	2025-10-05	\N	100.00	90.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
efbb89f8-c03f-4416-8c3a-d9e0a41ad95e	55ec3514-8325-4b2c-b996-5423457bd2d7	LOTE-FER003-2025-009	2025-09-20	\N	20.00	15.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
7eb77c1c-eee1-4cc8-8d50-3f3be05c273c	f8ceccae-fe83-47d0-aeed-5391ed316227	LOTE-FER005-2025-010	2025-10-08	\N	10.00	8.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
098c5621-2668-49df-90d6-f954948911d6	4e83eb41-e8b0-4515-a748-fe00271dafb2	LOTE-MAT002-2025-009	2025-09-15	\N	50.00	45.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
90842742-5546-4062-ac3f-4b619dffc1b4	b01660de-f0d1-4733-bdf9-71c36eabe2e3	LOTE-MAT005-2025-009	2025-09-01	2026-09-01	1000.00	850.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
cb7c3980-6068-46da-8934-d63a53f83826	a8c946ed-1339-48b2-8216-d8ad0701e80f	LOTE-QUI001-2025-008	2025-08-20	2026-08-20	200.00	170.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
62778446-ebbf-4543-9da6-5ab168a33f58	27035690-aa0f-44bc-8fbc-c56246cf9c35	LOTE-QUI002-2025-009	2025-09-10	2027-09-10	100.00	85.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
e156741d-8ab5-458a-bbc7-eda8d5b6bb55	08078cf4-8d6c-49b8-a87e-0bd2da481f10	LOTE-QUI003-2025-007	2025-07-15	2026-07-15	300.00	280.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
028653c9-c09a-443d-b76f-6cc983f979ad	202d8959-a9a7-4d56-acf5-b9cd1f82347a	LOTE-QUI004-2025-008	2025-08-01	2026-08-01	150.00	140.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
76452553-41e6-4d0d-be96-2c937fdf1a51	6295a12c-6343-4363-a5f6-adbba3ad798f	LOTE-QUI005-2025-009	2025-09-05	2026-09-05	100.00	95.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
52b2146b-e84f-4673-a79b-d8be4dad35ae	102fc588-6bac-4ef1-b66b-24617a7c9341	LOTE-ELE001-2025-010	2025-10-10	\N	5000.00	5000.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
16590dd2-1d4c-471d-8617-75870e324697	2e20ccfb-9eea-4fa3-904a-2840b462406d	LOTE-ELE002-2025-009	2025-09-25	\N	3000.00	2800.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
686bf3cb-9415-439d-bf2a-8f219fa45c2a	cb6ca7e3-91b6-43c3-91f9-174a95464053	LOTE-FIX001-2025-010	2025-10-03	\N	30000.00	29500.00	f	\N	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
4b06ab2b-23e4-45de-8629-49fd6ca6cee8	b01660de-f0d1-4733-bdf9-71c36eabe2e3	LOTE-MAT005-2025-006-BLOQ	2025-06-15	2026-06-15	500.00	500.00	t	Lote bloqueado - Problemas de qualidade detectados no controle	2025-10-12 21:26:13.754596+00	2025-10-12 21:26:13.754596+00
\.


--
-- Data for Name: movimentacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movimentacoes (id, tipo, produto_id, lote_id, localizacao_origem_id, localizacao_destino_id, quantidade, documento, observacao, realizada_por, realizada_em, custo_unitario, created_at) FROM stdin;
c394a103-5bdd-43c6-9a2a-8787931dee10	entrada	102fc588-6bac-4ef1-b66b-24617a7c9341	579a5a58-8e7f-4607-98b2-80f5c4e3770f	\N	2d7af078-2d3a-429e-a157-9de798fa3726	1000.00	REC-2024-001	Entrada de Resistores 1kΩ	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-01-20 00:00:00+00	0.15	2025-10-12 20:24:04.16418+00
f3ad59d1-5b25-46ca-ab85-0ce2fc2e739b	entrada	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	\N	caee9923-c48a-42be-982d-4528c5b733e2	500.00	REC-2024-002	Entrada de Capacitores 100µF	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-01-21 00:00:00+00	0.85	2025-10-12 20:24:04.16418+00
a7595870-d87a-4d48-9ef2-217c66ede413	entrada	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	\N	0debd13f-1eea-4021-a6a8-41f407649b8e	2000.00	REC-2024-003	Entrada de LEDs 5mm	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-01-22 00:00:00+00	0.25	2025-10-12 20:24:04.16418+00
48722e7c-9045-4101-b917-1b9472c9aa4e	entrada	cb6ca7e3-91b6-43c3-91f9-174a95464053	9e3ab036-0473-48fc-bd64-94c5d83875cd	\N	35960b5b-ec34-4fc0-885f-851118dfd271	5000.00	REC-2024-004	Entrada de Parafusos M4x16	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-01-23 00:00:00+00	0.18	2025-10-12 20:24:04.16418+00
34c48e60-9f1b-4a83-ba84-21e652b42b08	entrada	1bb621e9-f8b6-4052-8018-0cf395e08594	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	\N	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	200.00	REC-2024-010	Entrada de Fita Isolante	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-01-24 00:00:00+00	3.50	2025-10-12 20:24:04.16418+00
0d65a1c3-2ad2-4223-8d68-f9ff8ee391a2	entrada	a8c946ed-1339-48b2-8216-d8ad0701e80f	da1b49ca-35a8-464f-9a88-09af924bf4d1	\N	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	50.00	REC-2024-011	Entrada de Flux para Solda	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-01-25 00:00:00+00	12.90	2025-10-12 20:24:04.16418+00
a3af6970-760e-4f12-b7ed-d00848585eef	saida	102fc588-6bac-4ef1-b66b-24617a7c9341	579a5a58-8e7f-4607-98b2-80f5c4e3770f	2d7af078-2d3a-429e-a157-9de798fa3726	\N	150.00	EXP-2024-001	Saída para produção - Ordem 001	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-02-01 00:00:00+00	0.15	2025-10-12 20:24:04.16418+00
f7cb00f4-ea42-496c-b74c-29e5df661498	saida	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	caee9923-c48a-42be-982d-4528c5b733e2	\N	50.00	EXP-2024-002	Venda cliente - Pedido 1025	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-02-05 00:00:00+00	0.85	2025-10-12 20:24:04.16418+00
d766606d-2b38-4128-b203-2bc93ae80516	saida	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	0debd13f-1eea-4021-a6a8-41f407649b8e	\N	200.00	EXP-2024-003	Consumo interno - Manutenção	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-02-10 00:00:00+00	0.25	2025-10-12 20:24:04.16418+00
a28192f9-c056-4c2f-af3d-0424dfe89af1	saida	cb6ca7e3-91b6-43c3-91f9-174a95464053	9e3ab036-0473-48fc-bd64-94c5d83875cd	35960b5b-ec34-4fc0-885f-851118dfd271	\N	500.00	EXP-2024-004	Expedição urgente - Cliente VIP	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-02-15 00:00:00+00	0.18	2025-10-12 20:24:04.16418+00
c5655433-2739-40a4-8fd3-3f4a454d85a9	saida	602cae36-a6f3-4d77-9fc6-e73fd16c6485	\N	8b29a391-dd81-4c97-adbb-d468ed12a26e	\N	2.00	EXP-2024-010	Venda Arduino Uno - Pedido 1150	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-02-20 00:00:00+00	45.90	2025-10-12 20:24:04.16418+00
58f10d33-85cf-4c6d-b7c5-fdbb1cab4bc3	saida	1bb621e9-f8b6-4052-8018-0cf395e08594	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	\N	20.00	EXP-2024-011	Consumo manutenção elétrica	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-02-25 00:00:00+00	3.50	2025-10-12 20:24:04.16418+00
afd8392f-a6bd-4016-b3ee-fdd2962eb136	transferencia	102fc588-6bac-4ef1-b66b-24617a7c9341	579a5a58-8e7f-4607-98b2-80f5c4e3770f	2d7af078-2d3a-429e-a157-9de798fa3726	caee9923-c48a-42be-982d-4528c5b733e2	500.00	TRF-2024-001	Reorganização de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-01 00:00:00+00	\N	2025-10-12 20:24:04.16418+00
9d3b3057-a221-472f-99bf-f7e4d9aab178	transferencia	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	caee9923-c48a-42be-982d-4528c5b733e2	8b29a391-dd81-4c97-adbb-d468ed12a26e	100.00	TRF-2024-002	Transferência para área de picking	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-05 00:00:00+00	\N	2025-10-12 20:24:04.16418+00
3b01f286-758d-4a29-924a-ec4281f9ced7	transferencia	cb6ca7e3-91b6-43c3-91f9-174a95464053	9e3ab036-0473-48fc-bd64-94c5d83875cd	35960b5b-ec34-4fc0-885f-851118dfd271	076f6933-51c2-4945-98e0-22310f85301d	1000.00	TRF-2024-003	Transferência para almoxarifado secundário	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-10 00:00:00+00	\N	2025-10-12 20:24:04.16418+00
483de51f-cf12-4e02-80c3-cbe6297da75d	transferencia	1bb621e9-f8b6-4052-8018-0cf395e08594	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	b323540c-48e1-4f5f-a12f-bb4adbff9b22	50.00	TRF-2024-004	Transferência para deposito secundário	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-15 00:00:00+00	\N	2025-10-12 20:24:04.16418+00
228646b4-21fb-48c4-8678-f9234b0e0184	ajuste	102fc588-6bac-4ef1-b66b-24617a7c9341	579a5a58-8e7f-4607-98b2-80f5c4e3770f	\N	2d7af078-2d3a-429e-a157-9de798fa3726	50.00	AJU-2024-001	Ajuste positivo - Inventário mensal	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-20 00:00:00+00	0.15	2025-10-12 20:24:04.16418+00
42c1854a-ebbd-41b7-8ee3-d9d0de45d1b1	ajuste	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	0debd13f-1eea-4021-a6a8-41f407649b8e	\N	20.00	AJU-2024-002	Ajuste negativo - Produto danificado	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-25 00:00:00+00	0.25	2025-10-12 20:24:04.16418+00
8043d944-06fe-4e4f-9eab-d0e4c4a59d5e	ajuste	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	\N	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	100.00	AJU-2024-003	Ajuste positivo - Erro de contagem	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-28 00:00:00+00	0.12	2025-10-12 20:24:04.16418+00
b0cecd1f-973b-4b9b-b156-81b7cfd449a0	ajuste	a8c946ed-1339-48b2-8216-d8ad0701e80f	da1b49ca-35a8-464f-9a88-09af924bf4d1	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	\N	5.00	AJU-2024-004	Ajuste negativo - Validade vencida	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2024-03-30 00:00:00+00	12.90	2025-10-12 20:24:04.16418+00
694b614b-4329-45af-b362-c4c4bb9bdbb0	entrada	102fc588-6bac-4ef1-b66b-24617a7c9341	579a5a58-8e7f-4607-98b2-80f5c4e3770f	\N	2d7af078-2d3a-429e-a157-9de798fa3726	500.00	REC-OUT-001	Reposição de estoque - Resistores 1kΩ	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-12 09:15:00+00	0.15	2025-10-12 20:32:15.266809+00
ac203dae-7a19-494b-96b3-4f6cddd907e3	saida	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	caee9923-c48a-42be-982d-4528c5b733e2	\N	100.00	EXP-OUT-012	Expedição urgente - Capacitores para cliente Premium	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-12 14:30:00+00	0.85	2025-10-12 20:32:15.266809+00
63781269-02ad-431c-96ec-517199d566cf	transferencia	cb6ca7e3-91b6-43c3-91f9-174a95464053	9e3ab036-0473-48fc-bd64-94c5d83875cd	35960b5b-ec34-4fc0-885f-851118dfd271	7e317a86-3eff-4a08-a2d3-4681eaa6edcb	2000.00	TRF-OUT-005	Reorganização - Movendo para área de pallet	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-11 10:00:00+00	\N	2025-10-12 20:32:15.266809+00
d16ca0f2-96b3-413e-a904-2f0b6e59a58b	saida	1bb621e9-f8b6-4052-8018-0cf395e08594	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	\N	50.00	EXP-OUT-011	Venda - Fitas isolantes para distribuidora	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-09 16:45:00+00	3.50	2025-10-12 20:32:15.266809+00
5cc99308-e2ee-491a-9f60-318ebc48b4e0	entrada	27035690-aa0f-44bc-8fbc-c56246cf9c35	a4b2bf36-138a-45be-8949-310d874a6e21	\N	6519449b-6bc8-4853-bfc3-4fa11d870690	25.00	REC-OUT-008	Recebimento - Álcool isopropílico para limpeza	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-08 08:30:00+00	28.00	2025-10-12 20:32:15.266809+00
e2bea86f-84bd-4c59-b5ab-62e515902719	ajuste	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	0debd13f-1eea-4021-a6a8-41f407649b8e	\N	50.00	AJU-OUT-003	Ajuste negativo - LEDs danificados em transporte	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-06 11:20:00+00	0.25	2025-10-12 20:32:15.266809+00
692f2246-7c4b-4e93-bd45-0b6e90c3cac5	saida	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	\N	1000.00	EXP-OUT-010	Expedição - Porcas M4 para montadora	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-05 15:00:00+00	0.12	2025-10-12 20:32:15.266809+00
6c4bd3f6-d3ee-473f-b3e4-b644534ab5e2	entrada	55ec3514-8325-4b2c-b996-5423457bd2d7	c27b1c29-39f0-424e-a34f-f71f97ed1938	\N	2cf73d1b-54c3-4457-b643-b4ac7c1deb21	5.00	REC-OUT-007	Recebimento - Multímetros digitais novos	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-05 09:30:00+00	89.90	2025-10-12 20:32:15.266809+00
5557e411-ab77-4bbf-94fc-2f45d55ed0c3	transferencia	3e44bb57-44a2-4643-9ee3-8be89536c490	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	dc224e5f-4f76-48a9-870a-5111059717ec	cb2569a9-bb62-448e-a13e-d80706bcda47	100.00	TRF-OUT-004	Transferência - Cabos para almoxarifado secundário	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-04 13:15:00+00	\N	2025-10-12 20:32:15.266809+00
9575c7f4-e386-49dd-8e82-8283f9dab8a7	saida	602cae36-a6f3-4d77-9fc6-e73fd16c6485	\N	8b29a391-dd81-4c97-adbb-d468ed12a26e	\N	3.00	EXP-OUT-009	Venda - Arduino Uno para escola técnica	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-04 10:45:00+00	45.90	2025-10-12 20:32:15.266809+00
b7b6f5b4-baed-4b3a-ab06-00e744e02a59	ajuste	cb6ca7e3-91b6-43c3-91f9-174a95464053	9e3ab036-0473-48fc-bd64-94c5d83875cd	\N	35960b5b-ec34-4fc0-885f-851118dfd271	200.00	AJU-OUT-002	Ajuste positivo - Contagem física mensal	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-03 14:20:00+00	0.18	2025-10-12 20:32:15.266809+00
69dd819d-bbae-4b24-b0af-110eb578c4e5	entrada	4e83eb41-e8b0-4515-a748-fe00271dafb2	e0e6ad6d-8fe7-49ef-8329-66c4be926f88	\N	914e5fe9-5e8a-485c-b40d-c499a82a939b	10.00	REC-OUT-006	Recebimento - Estanho para solda 60/40	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-03 08:00:00+00	85.00	2025-10-12 20:32:15.266809+00
989ed180-153a-4366-a87a-0c1ce8e12f2f	saida	a8c946ed-1339-48b2-8216-d8ad0701e80f	da1b49ca-35a8-464f-9a88-09af924bf4d1	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	\N	15.00	EXP-OUT-008	Expedição - Flux para assistência técnica	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-02 16:30:00+00	12.90	2025-10-12 20:32:15.266809+00
f9f804ee-a9c1-463b-b6b8-84a31ee8fbcc	transferencia	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	caee9923-c48a-42be-982d-4528c5b733e2	ab862da3-c8f7-4aa4-b5de-136de198f9d4	200.00	TRF-OUT-003	Reorganização - Capacitores para picking	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-02 11:00:00+00	\N	2025-10-12 20:32:15.266809+00
53b8855d-a5a6-46fa-a4ca-3fcfd9cd1b54	entrada	ba7a006b-2bfc-4fbe-bc64-55c1f7ca7711	681413d3-5f96-4b27-81c2-52e2a3e03e4a	\N	c2c3ea34-d0cc-4688-8608-4eb9933685c0	5000.00	REC-OUT-005	Recebimento - Rebites de alumínio 4mm	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-01 14:45:00+00	0.15	2025-10-12 20:32:15.266809+00
41c4c93a-7725-4f63-bafd-200925f8c0be	saida	43d62f0f-e866-4e1f-9e66-3afa8daa3ec1	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	dc224e5f-4f76-48a9-870a-5111059717ec	\N	30.00	EXP-OUT-007	Venda - Tubos termo retrátil 3mm	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-01 10:15:00+00	12.50	2025-10-12 20:32:15.266809+00
163206fb-3c2e-4897-b03b-3c3efcdce587	ajuste	102fc588-6bac-4ef1-b66b-24617a7c9341	579a5a58-8e7f-4607-98b2-80f5c4e3770f	\N	2d7af078-2d3a-429e-a157-9de798fa3726	100.00	AJU-OUT-001	Ajuste positivo - Inventário início do mês	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-01 08:30:00+00	0.15	2025-10-12 20:32:15.266809+00
317e1c84-94b1-4fe6-acbb-7b8e563916b0	saida	61b6e8bd-e1be-4ebf-bec9-c7881192e98e	c27b1c29-39f0-424e-a34f-f71f97ed1938	8b29a391-dd81-4c97-adbb-d468ed12a26e	\N	1.00	EXP-202504-009	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-04-18 18:17:00+00	149.81	2025-10-14 03:21:12.869435+00
7f4dbf81-0838-423c-88a8-8268ad2e4235	transferencia	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	2d7af078-2d3a-429e-a157-9de798fa3726	2000.00	TRF-202504-003	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-04-21 15:14:00+00	\N	2025-10-14 03:21:12.869435+00
c3a12c29-40d9-49b5-804d-287b3fb7f414	ajuste	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	\N	250.00	AJU-202504-024	Correção de divergência	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-04-22 09:34:00+00	\N	2025-10-14 03:21:12.869435+00
f8e6a170-8eae-42e7-9df5-99264a247a0b	saida	60c76d84-57d6-4066-9e68-114bedee3319	\N	cb2569a9-bb62-448e-a13e-d80706bcda47	\N	5.00	EXP-202504-013	Saída para produção	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-04-23 16:24:00+00	74.04	2025-10-14 03:21:12.869435+00
555b8737-7022-4fea-a880-72fc2e1676e6	saida	08078cf4-8d6c-49b8-a87e-0bd2da481f10	\N	8b29a391-dd81-4c97-adbb-d468ed12a26e	\N	25.00	EXP-202504-017	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-04-25 16:10:00+00	44.64	2025-10-14 03:21:12.869435+00
773bb2bd-32b8-4735-8c2c-e909b2d18189	transferencia	ba7a006b-2bfc-4fbe-bc64-55c1f7ca7711	\N	b323540c-48e1-4f5f-a12f-bb4adbff9b22	6519449b-6bc8-4853-bfc3-4fa11d870690	1000.00	TRF-202504-025	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-04-27 14:46:00+00	\N	2025-10-14 03:21:12.869435+00
3eec0e93-4f86-4d4d-900b-d6eb1190c30d	entrada	08078cf4-8d6c-49b8-a87e-0bd2da481f10	\N	\N	cb2569a9-bb62-448e-a13e-d80706bcda47	30.00	REC-202505-027	Recebimento de materiais	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-01 14:38:00+00	30.79	2025-10-14 03:21:12.869435+00
5ea4199f-9ea1-423e-841e-44bf8843a010	saida	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	\N	2.00	EXP-202505-010	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-08 14:24:00+00	119.58	2025-10-14 03:21:12.869435+00
2903bf40-2a6f-4668-8676-4c3b62de7330	saida	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	\N	\N	300.00	EXP-202505-026	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-10 09:03:00+00	12.90	2025-10-14 03:21:12.869435+00
ea3b6d96-182a-4526-8f08-80767ca4eb7b	saida	202d8959-a9a7-4d56-acf5-b9cd1f82347a	\N	7e317a86-3eff-4a08-a2d3-4681eaa6edcb	\N	25.00	EXP-202505-005	Saída para produção	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-10 15:24:00+00	22.14	2025-10-14 03:21:12.869435+00
61743b20-704c-4cbe-8714-6c934c13b95d	saida	4bd8c371-05c8-44f7-9088-beba5c017de7	\N	\N	\N	1500.00	EXP-202505-021	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-11 09:43:00+00	0.25	2025-10-14 03:21:12.869435+00
6b86f1d5-4614-4448-8d65-5c681717279c	entrada	1bb621e9-f8b6-4052-8018-0cf395e08594	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	\N	dc224e5f-4f76-48a9-870a-5111059717ec	100.00	REC-202505-028	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-13 16:10:00+00	132.85	2025-10-14 03:21:12.869435+00
99708d9d-4f1a-487e-ba92-31558f0f24e0	saida	f8ceccae-fe83-47d0-aeed-5391ed316227	\N	65e1a762-63fa-4bac-9ad1-e11304c1479b	\N	3.00	EXP-202505-033	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-22 12:20:00+00	148.58	2025-10-14 03:21:12.869435+00
97160c31-acf6-419a-9299-9e58719b3e08	entrada	61b6e8bd-e1be-4ebf-bec9-c7881192e98e	c27b1c29-39f0-424e-a34f-f71f97ed1938	\N	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	1.00	REC-202505-035	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-24 08:16:00+00	130.86	2025-10-14 03:21:12.869435+00
2375a198-47ce-4170-a32f-f3ac44d4ecd1	ajuste	55ec3514-8325-4b2c-b996-5423457bd2d7	\N	2d7af078-2d3a-429e-a157-9de798fa3726	\N	1.00	AJU-202505-029	Ajuste de inventário	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-25 13:44:00+00	\N	2025-10-14 03:21:12.869435+00
dbd8f111-3155-4bc4-9cef-523ce3150215	entrada	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	\N	cb2569a9-bb62-448e-a13e-d80706bcda47	500.00	REC-202505-034	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-05-28 13:13:00+00	1.92	2025-10-14 03:21:12.869435+00
d4f6054a-8f41-4e17-b7c9-16f65d5ce525	entrada	f8ceccae-fe83-47d0-aeed-5391ed316227	\N	\N	2d7af078-2d3a-429e-a157-9de798fa3726	5.00	REC-202506-006	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-10 18:15:00+00	104.14	2025-10-14 03:21:12.869435+00
a361a01d-9359-43f6-91b1-a96130ba8ede	saida	f00d0830-ddeb-46bd-8731-97cac655da0d	\N	076f6933-51c2-4945-98e0-22310f85301d	\N	50.00	EXP-202506-031	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-12 14:32:00+00	33.03	2025-10-14 03:21:12.869435+00
6044b235-b06f-4fa5-ba40-6a9de05742d5	entrada	4bd8c371-05c8-44f7-9088-beba5c017de7	\N	\N	8b29a391-dd81-4c97-adbb-d468ed12a26e	2000.00	REC-202506-012	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-15 16:12:00+00	0.21	2025-10-14 03:21:12.869435+00
991e8cb6-9f07-404c-bb36-5630889f7f0f	entrada	55ec3514-8325-4b2c-b996-5423457bd2d7	\N	\N	b323540c-48e1-4f5f-a12f-bb4adbff9b22	1.00	REC-202506-004	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-17 13:42:00+00	195.38	2025-10-14 03:21:12.869435+00
e9badba0-0493-4abe-896a-180414b90e02	saida	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	35960b5b-ec34-4fc0-885f-851118dfd271	\N	1.00	EXP-202506-011	Saída para produção	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-23 10:21:00+00	85.75	2025-10-14 03:21:12.869435+00
b1a4b012-ed8e-43df-9677-b6103660b45c	transferencia	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	caee9923-c48a-42be-982d-4528c5b733e2	9beaf62d-d6f9-4968-911b-bfb65cb1efad	5.00	TRF-202506-019	Movimentação interna	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-24 14:55:00+00	\N	2025-10-14 03:21:12.869435+00
dff4e422-ae48-45ef-a6c9-a1d29d4e52fd	saida	6295a12c-6343-4363-a5f6-adbba3ad798f	\N	c810227a-b046-4383-aea7-6c8a2d0e5801	\N	20.00	EXP-202506-016	Saída para produção	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-24 17:00:00+00	21.95	2025-10-14 03:21:12.869435+00
41fab876-5a41-47ba-8df9-8c0c9a3d2258	transferencia	08078cf4-8d6c-49b8-a87e-0bd2da481f10	\N	c2c3ea34-d0cc-4688-8608-4eb9933685c0	ffe62c89-effa-4db1-9818-a610b71b0a44	30.00	TRF-202506-007	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-06-27 13:24:00+00	\N	2025-10-14 03:21:12.869435+00
f407f98f-32d5-439e-9f79-b92a21845cee	saida	4bd8c371-05c8-44f7-9088-beba5c017de7	\N	2cf73d1b-54c3-4457-b643-b4ac7c1deb21	\N	1000.00	EXP-202507-014	Expedição pedido #5652	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-07-02 16:46:00+00	0.14	2025-10-14 03:21:12.869435+00
732d29ff-e775-411e-ab89-9ccbe2ec41fa	saida	27035690-aa0f-44bc-8fbc-c56246cf9c35	a4b2bf36-138a-45be-8949-310d874a6e21	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	\N	10.00	EXP-202507-020	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-07-03 11:58:00+00	13.97	2025-10-14 03:21:12.869435+00
bca44724-f8dc-4f6f-99cd-a9c04f3d48b9	saida	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	076f6933-51c2-4945-98e0-22310f85301d	\N	2.00	EXP-202507-008	Saída para produção	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-07-21 12:21:00+00	50.81	2025-10-14 03:21:12.869435+00
ecc1aa58-3d94-4c8c-9d7e-c8e0450abf9b	saida	4e83eb41-e8b0-4515-a748-fe00271dafb2	\N	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	\N	10.00	EXP-202507-015	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-07-24 15:35:00+00	24.06	2025-10-14 03:21:12.869435+00
b68e759d-6928-4886-a05e-3e1a5e88a33f	ajuste	cb6ca7e3-91b6-43c3-91f9-174a95464053	9e3ab036-0473-48fc-bd64-94c5d83875cd	0debd13f-1eea-4021-a6a8-41f407649b8e	\N	1500.00	AJU-202507-002	Ajuste de inventário	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-07-24 16:30:00+00	\N	2025-10-14 03:21:12.869435+00
23202562-15a4-4442-8984-2ce99f65ca7b	transferencia	4bd8c371-05c8-44f7-9088-beba5c017de7	\N	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	caee9923-c48a-42be-982d-4528c5b733e2	1000.00	TRF-202507-030	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-07-26 09:00:00+00	\N	2025-10-14 03:21:12.869435+00
ca8fca5e-62ae-4e62-b616-2a37d03807af	saida	4bd8c371-05c8-44f7-9088-beba5c017de7	\N	65e1a762-63fa-4bac-9ad1-e11304c1479b	\N	1500.00	EXP-202507-023	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-07-29 09:50:00+00	0.30	2025-10-14 03:21:12.869435+00
bfae239b-218d-4459-a580-ea5804afb411	saida	27035690-aa0f-44bc-8fbc-c56246cf9c35	a4b2bf36-138a-45be-8949-310d874a6e21	c810227a-b046-4383-aea7-6c8a2d0e5801	\N	20.00	EXP-202508-018	Expedição pedido #9969	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-01 09:54:00+00	12.15	2025-10-14 03:21:12.869435+00
4b1c6f47-0666-4b2f-aef4-860f0223de52	entrada	60c76d84-57d6-4066-9e68-114bedee3319	\N	\N	caee9923-c48a-42be-982d-4528c5b733e2	10.00	REC-202508-001	Recebimento de materiais	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-01 16:31:00+00	137.27	2025-10-14 03:21:12.869435+00
6a0dbfb5-bad4-4c86-b55c-92a2cd0793ed	entrada	43d62f0f-e866-4e1f-9e66-3afa8daa3ec1	\N	\N	cb2569a9-bb62-448e-a13e-d80706bcda47	20.00	REC-202508-032	Recebimento de materiais	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-05 15:04:00+00	11.70	2025-10-14 03:21:12.869435+00
d1a07101-5b1f-4457-80f5-25891ac3b5ef	transferencia	61b6e8bd-e1be-4ebf-bec9-c7881192e98e	c27b1c29-39f0-424e-a34f-f71f97ed1938	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	\N	3.00	TRF-202508-036	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-15 15:55:00+00	\N	2025-10-14 03:21:12.869435+00
704be047-2d23-4920-8b2e-360109cfbeed	transferencia	3e44bb57-44a2-4643-9ee3-8be89536c490	\N	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	0debd13f-1eea-4021-a6a8-41f407649b8e	10.00	TRF-202508-022	Reorganização de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-15 17:34:00+00	\N	2025-10-14 03:21:12.869435+00
c3f0a83b-a71d-4257-832e-203d8d7cc07b	saida	4bd8c371-05c8-44f7-9088-beba5c017de7	\N	dc224e5f-4f76-48a9-870a-5111059717ec	\N	3000.00	EXP-202508-080	Expedição pedido #8932	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-17 12:17:00+00	0.32	2025-10-14 03:21:12.869435+00
6022436e-b450-43ec-8677-c1e1236b7bdf	saida	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	914e5fe9-5e8a-485c-b40d-c499a82a939b	\N	1.00	EXP-202508-067	Expedição pedido #4164	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-17 12:41:00+00	129.15	2025-10-14 03:21:12.869435+00
0ea0adc4-e72e-4c52-93a6-c017064ebd67	entrada	6295a12c-6343-4363-a5f6-adbba3ad798f	\N	\N	6519449b-6bc8-4853-bfc3-4fa11d870690	30.00	REC-202508-087	Entrada por devolução	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-17 16:32:00+00	14.44	2025-10-14 03:21:12.869435+00
5676d148-de56-45b6-9b3f-60e7d38cc978	entrada	f00d0830-ddeb-46bd-8731-97cac655da0d	\N	\N	8b29a391-dd81-4c97-adbb-d468ed12a26e	250.00	REC-202508-054	Recebimento de materiais	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-18 09:15:00+00	32.13	2025-10-14 03:21:12.869435+00
c7a81096-fea7-4793-9b16-6a62fccac5f0	entrada	61b6e8bd-e1be-4ebf-bec9-c7881192e98e	c27b1c29-39f0-424e-a34f-f71f97ed1938	\N	\N	1.00	REC-202508-053	Entrada por devolução	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-19 16:35:00+00	140.20	2025-10-14 03:21:12.869435+00
d62db4ed-965d-4c49-bb3d-72d8b449610d	saida	4e83eb41-e8b0-4515-a748-fe00271dafb2	\N	076f6933-51c2-4945-98e0-22310f85301d	\N	50.00	EXP-202508-042	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-19 18:44:00+00	88.68	2025-10-14 03:21:12.869435+00
d0343d5e-8d26-4e3f-aa37-1bce305ff594	entrada	1bb621e9-f8b6-4052-8018-0cf395e08594	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	\N	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	20.00	REC-202508-041	Entrada por devolução	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-20 17:40:00+00	93.75	2025-10-14 03:21:12.869435+00
e50c22dd-fde2-449a-be67-cdad1d4291c4	saida	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	c2c3ea34-d0cc-4688-8608-4eb9933685c0	\N	300.00	EXP-202508-063	Expedição pedido #2808	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-21 13:28:00+00	44.38	2025-10-14 03:21:12.869435+00
ec06474b-0888-427f-b088-b885f0bd62d9	entrada	1bb621e9-f8b6-4052-8018-0cf395e08594	510a7a70-19e9-4f14-8f2a-cf6b8f70c712	\N	ab862da3-c8f7-4aa4-b5de-136de198f9d4	30.00	REC-202508-040	Recebimento de materiais	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-23 09:25:00+00	102.32	2025-10-14 03:21:12.869435+00
58d5982b-1717-4e5c-a5b1-2c2e33ae8a9b	entrada	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	\N	c2c3ea34-d0cc-4688-8608-4eb9933685c0	3.00	REC-202508-048	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-23 11:18:00+00	40.41	2025-10-14 03:21:12.869435+00
1f07947f-2fec-454f-be33-5b403e893603	entrada	80c4120a-5b07-4748-bc8f-f551049adef1	\N	\N	35960b5b-ec34-4fc0-885f-851118dfd271	5000.00	REC-202508-039	Recebimento de materiais	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-24 09:00:00+00	0.49	2025-10-14 03:21:12.869435+00
2df68885-993c-4fe8-866d-a96f9223a84a	entrada	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	\N	c810227a-b046-4383-aea7-6c8a2d0e5801	10.00	REC-202508-043	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-24 15:17:00+00	69.43	2025-10-14 03:21:12.869435+00
91df2c14-90da-4890-a107-25ac44ba4684	transferencia	08078cf4-8d6c-49b8-a87e-0bd2da481f10	\N	c810227a-b046-4383-aea7-6c8a2d0e5801	ffe62c89-effa-4db1-9818-a610b71b0a44	25.00	TRF-202508-084	Transferência interna	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-24 16:40:00+00	\N	2025-10-14 03:21:12.869435+00
d9648ca5-ed6a-4a96-8147-1959a6411a6c	transferencia	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	ffe62c89-effa-4db1-9818-a610b71b0a44	2d7af078-2d3a-429e-a157-9de798fa3726	1500.00	TRF-202508-066	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-27 09:31:00+00	\N	2025-10-14 03:21:12.869435+00
9634a0ad-be76-4fca-91ef-12c4d072c4aa	entrada	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	\N	2d7af078-2d3a-429e-a157-9de798fa3726	1500.00	REC-202508-078	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-28 17:13:00+00	0.28	2025-10-14 03:21:12.869435+00
681fe942-0e92-480d-8922-82303967b93c	entrada	8ff1477f-c28a-402b-8d2a-0b7d162ec56b	db4b73d3-7f87-49aa-8b5a-1dfc784f7aa5	\N	076f6933-51c2-4945-98e0-22310f85301d	300.00	REC-202508-089	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-08-31 08:57:00+00	3.37	2025-10-14 03:21:12.869435+00
d695ebd3-2168-4941-bf9d-b9622dc21f98	ajuste	4e83eb41-e8b0-4515-a748-fe00271dafb2	\N	6519449b-6bc8-4853-bfc3-4fa11d870690	\N	10.00	AJU-202509-057	Ajuste de inventário	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-02 08:42:00+00	\N	2025-10-14 03:21:12.869435+00
c172f9c6-ad88-4390-9235-461ac42fa017	ajuste	6295a12c-6343-4363-a5f6-adbba3ad798f	\N	\N	c810227a-b046-4383-aea7-6c8a2d0e5801	30.00	AJU-202509-050	Acerto pós-contagem	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-04 10:57:00+00	\N	2025-10-14 03:21:12.869435+00
45058517-fd07-4e45-9fa5-d7f43cb53238	saida	43d62f0f-e866-4e1f-9e66-3afa8daa3ec1	\N	076f6933-51c2-4945-98e0-22310f85301d	\N	20.00	EXP-202509-085	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-04 15:32:00+00	7.32	2025-10-14 03:21:12.869435+00
64de632f-b76e-43c6-9398-8ab26b1a81a2	saida	3e44bb57-44a2-4643-9ee3-8be89536c490	\N	\N	\N	10.00	EXP-202509-062	Expedição pedido #6482	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-05 09:44:00+00	81.08	2025-10-14 03:21:12.869435+00
c93a7579-6620-43e0-9d1c-7a689cfd2289	entrada	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	\N	076f6933-51c2-4945-98e0-22310f85301d	2000.00	REC-202509-081	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-05 10:42:00+00	0.43	2025-10-14 03:21:12.869435+00
e1c8b067-f224-4478-8576-50453cc2f364	saida	ba7a006b-2bfc-4fbe-bc64-55c1f7ca7711	\N	ab862da3-c8f7-4aa4-b5de-136de198f9d4	\N	3000.00	EXP-202509-061	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-05 11:20:00+00	0.35	2025-10-14 03:21:12.869435+00
71eaf965-4bc7-49d7-a77d-eea354a7bd21	saida	3e44bb57-44a2-4643-9ee3-8be89536c490	\N	b323540c-48e1-4f5f-a12f-bb4adbff9b22	\N	30.00	EXP-202509-065	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-05 17:29:00+00	10.51	2025-10-14 03:21:12.869435+00
7d8e4831-1fb1-420e-948f-71d9371f59f0	ajuste	f00d0830-ddeb-46bd-8731-97cac655da0d	\N	\N	8b29a391-dd81-4c97-adbb-d468ed12a26e	200.00	AJU-202509-052	Correção de divergência	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-06 17:54:00+00	\N	2025-10-14 03:21:12.869435+00
b0eb2b72-5b70-473e-bc5a-a0750667fe62	saida	4e83eb41-e8b0-4515-a748-fe00271dafb2	\N	c2c3ea34-d0cc-4688-8608-4eb9933685c0	\N	20.00	EXP-202509-070	Expedição pedido #6858	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-07 13:37:00+00	48.87	2025-10-14 03:21:12.869435+00
a4020627-4f28-4d55-a91f-5faee1be3cf1	saida	a8c946ed-1339-48b2-8216-d8ad0701e80f	da1b49ca-35a8-464f-9a88-09af924bf4d1	2cf73d1b-54c3-4457-b643-b4ac7c1deb21	\N	15.00	EXP-202509-064	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-09 08:01:00+00	17.02	2025-10-14 03:21:12.869435+00
d91ca82e-045b-4025-8d53-8b86ff2c78e9	saida	202d8959-a9a7-4d56-acf5-b9cd1f82347a	\N	c2c3ea34-d0cc-4688-8608-4eb9933685c0	\N	10.00	EXP-202509-056	Expedição pedido #2352	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-09 13:46:00+00	22.10	2025-10-14 03:21:12.869435+00
c9e0ebb1-c3c2-4f0f-959a-0257ff93c80e	saida	42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	\N	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	\N	3.00	EXP-202509-075	Expedição pedido #2533	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-11 18:32:00+00	88.28	2025-10-14 03:21:12.869435+00
480eb14b-9b7d-4348-9f41-d6190a181b55	transferencia	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	\N	0debd13f-1eea-4021-a6a8-41f407649b8e	250.00	TRF-202509-045	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-12 12:52:00+00	\N	2025-10-14 03:21:12.869435+00
e94fba2c-2160-44a1-8fe9-e4107476408e	entrada	202d8959-a9a7-4d56-acf5-b9cd1f82347a	\N	\N	cb2569a9-bb62-448e-a13e-d80706bcda47	15.00	REC-202509-083	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-15 15:34:00+00	43.12	2025-10-14 03:21:12.869435+00
ba1bc3c2-3f69-4d37-ba33-7086a33d7f39	entrada	3e44bb57-44a2-4643-9ee3-8be89536c490	\N	\N	caee9923-c48a-42be-982d-4528c5b733e2	50.00	REC-202509-090	Recebimento de materiais	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-19 11:13:00+00	64.50	2025-10-14 03:21:12.869435+00
25778667-7651-49d3-a94b-100cfd3775ec	saida	80c4120a-5b07-4748-bc8f-f551049adef1	\N	35960b5b-ec34-4fc0-885f-851118dfd271	\N	1500.00	EXP-202509-082	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-19 12:50:00+00	0.45	2025-10-14 03:21:12.869435+00
a89846f2-2961-4914-9d53-f66857ad0525	entrada	60c76d84-57d6-4066-9e68-114bedee3319	\N	\N	7e317a86-3eff-4a08-a2d3-4681eaa6edcb	3.00	REC-202509-060	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-21 18:03:00+00	32.43	2025-10-14 03:21:12.869435+00
e21e4d00-ddde-4716-b04f-778368911e1a	ajuste	55ec3514-8325-4b2c-b996-5423457bd2d7	\N	\N	076f6933-51c2-4945-98e0-22310f85301d	10.00	AJU-202509-038	Acerto pós-contagem	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-23 15:07:00+00	\N	2025-10-14 03:21:12.869435+00
c6db30c8-2ec9-448a-864a-ec22f270522d	entrada	55ec3514-8325-4b2c-b996-5423457bd2d7	\N	\N	cb2569a9-bb62-448e-a13e-d80706bcda47	2.00	REC-202509-046	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-23 18:53:00+00	145.30	2025-10-14 03:21:12.869435+00
c59903b7-9649-406e-95a6-41878c6c1d48	ajuste	f00d0830-ddeb-46bd-8731-97cac655da0d	\N	2cf73d1b-54c3-4457-b643-b4ac7c1deb21	\N	50.00	AJU-202509-088	Correção de divergência	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-24 08:15:00+00	\N	2025-10-14 03:21:12.869435+00
2282e967-66c9-4dab-9f7d-38f957829136	transferencia	80c4120a-5b07-4748-bc8f-f551049adef1	\N	c9a2feaf-a4e7-498f-94b1-c4c2b203b6e9	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	5000.00	TRF-202509-044	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-24 09:10:00+00	\N	2025-10-14 03:21:12.869435+00
66237d26-3b3a-407f-b652-be88b259a459	saida	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	\N	\N	5000.00	EXP-202509-074	Saída para produção	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-24 10:24:00+00	0.41	2025-10-14 03:21:12.869435+00
2a633652-2b00-4723-b8f5-91b396987405	entrada	4e83eb41-e8b0-4515-a748-fe00271dafb2	\N	\N	\N	50.00	REC-202509-072	Recebimento fornecedor	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-24 13:21:00+00	95.97	2025-10-14 03:21:12.869435+00
afe4d1fd-768b-479b-811c-2d5c94b1abae	entrada	60c76d84-57d6-4066-9e68-114bedee3319	\N	\N	ffe62c89-effa-4db1-9818-a610b71b0a44	5.00	REC-202509-037	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-25 11:31:00+00	197.81	2025-10-14 03:21:12.869435+00
b5313d52-f240-4fa4-8ef6-4b89418aa1bc	saida	60c76d84-57d6-4066-9e68-114bedee3319	\N	\N	\N	10.00	EXP-202509-058	Consumo interno	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-25 17:56:00+00	103.04	2025-10-14 03:21:12.869435+00
ce6a336d-1a46-4c12-aceb-a8ebace7d99f	ajuste	4e83eb41-e8b0-4515-a748-fe00271dafb2	\N	\N	ab862da3-c8f7-4aa4-b5de-136de198f9d4	20.00	AJU-202509-047	Ajuste por quebra	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-26 10:40:00+00	\N	2025-10-14 03:21:12.869435+00
18548e2d-70cf-4fd9-89f2-974b186b0b6d	transferencia	602cae36-a6f3-4d77-9fc6-e73fd16c6485	\N	e1141b1d-8a51-4bc6-ad82-61b2fb2efa5f	076f6933-51c2-4945-98e0-22310f85301d	250.00	TRF-202509-086	Movimentação interna	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-28 13:13:00+00	\N	2025-10-14 03:21:12.869435+00
194b22da-d46d-4da1-ad33-d77f378a4bd5	saida	f8ceccae-fe83-47d0-aeed-5391ed316227	\N	65e1a762-63fa-4bac-9ad1-e11304c1479b	\N	10.00	EXP-202509-076	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-28 14:53:00+00	179.68	2025-10-14 03:21:12.869435+00
a0eae721-3fe9-412f-8ddf-2f1407e749c9	entrada	f970eca6-c7ec-4c39-927b-52982e5d7285	681413d3-5f96-4b27-81c2-52e2a3e03e4a	\N	c810227a-b046-4383-aea7-6c8a2d0e5801	1500.00	REC-202509-059	Entrada por devolução	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-30 09:14:00+00	0.42	2025-10-14 03:21:12.869435+00
04287be2-76d8-4565-ac69-e25b46c8d0a6	entrada	80c4120a-5b07-4748-bc8f-f551049adef1	\N	\N	914e5fe9-5e8a-485c-b40d-c499a82a939b	3000.00	REC-202509-068	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-30 13:36:00+00	0.05	2025-10-14 03:21:12.869435+00
215092a6-9817-43e3-8b4b-d53a698e75a0	entrada	4bd8c371-05c8-44f7-9088-beba5c017de7	\N	\N	c2c3ea34-d0cc-4688-8608-4eb9933685c0	500.00	REC-202509-073	Entrada por devolução	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-09-30 15:03:00+00	0.49	2025-10-14 03:21:12.869435+00
5fef4bb0-8fc2-4545-96ce-05538eeaa650	entrada	b01660de-f0d1-4733-bdf9-71c36eabe2e3	e0e6ad6d-8fe7-49ef-8329-66c4be926f88	\N	ffe62c89-effa-4db1-9818-a610b71b0a44	100.00	REC-202510-051	Entrada de estoque	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-01 11:43:00+00	38.40	2025-10-14 03:21:12.869435+00
b6feb570-3ce6-4052-80b5-b40a307cf060	saida	61b6e8bd-e1be-4ebf-bec9-c7881192e98e	c27b1c29-39f0-424e-a34f-f71f97ed1938	ffe62c89-effa-4db1-9818-a610b71b0a44	\N	3.00	EXP-202510-049	Venda balcão	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-04 11:48:00+00	159.67	2025-10-14 03:21:12.869435+00
a7bf15bd-8514-4661-b7b1-8c2058cf2c09	transferencia	a8c946ed-1339-48b2-8216-d8ad0701e80f	da1b49ca-35a8-464f-9a88-09af924bf4d1	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	cb2569a9-bb62-448e-a13e-d80706bcda47	10.00	TRF-202510-055	Transferência interna	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-04 13:39:00+00	\N	2025-10-14 03:21:12.869435+00
97b1b50e-09be-4086-84d0-8be2eed450f7	saida	cb6ca7e3-91b6-43c3-91f9-174a95464053	9e3ab036-0473-48fc-bd64-94c5d83875cd	1b33aae7-e5e3-4b7e-b178-fc8f43dc587a	\N	1500.00	EXP-202510-079	Expedição pedido #4930	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-08 08:59:00+00	0.19	2025-10-14 03:21:12.869435+00
0554b2f7-b9af-4626-9efd-ebb4074dd9df	transferencia	2e20ccfb-9eea-4fa3-904a-2840b462406d	86cbaeec-61a9-4da5-bc1c-501fb0e6ccea	914e5fe9-5e8a-485c-b40d-c499a82a939b	dc224e5f-4f76-48a9-870a-5111059717ec	200.00	TRF-202510-077	Balanceamento	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-11 13:30:00+00	\N	2025-10-14 03:21:12.869435+00
358b33cb-aa2a-43af-ae7b-b1e7ee57d95d	saida	60c76d84-57d6-4066-9e68-114bedee3319	\N	ab862da3-c8f7-4aa4-b5de-136de198f9d4	\N	1.00	EXP-202510-071	Expedição pedido #9349	5eb030f8-c483-483e-a7fa-87e79b75ecbb	2025-10-12 18:02:00+00	162.05	2025-10-14 03:21:12.869435+00
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produtos (id, sku, nome, descricao, categoria, unidade, codigo_barras, peso_kg, altura_cm, largura_cm, profundidade_cm, custo_unitario, preco_venda, estoque_minimo, estoque_maximo, controla_lote, controla_validade, status, created_at, updated_at) FROM stdin;
602cae36-a6f3-4d77-9fc6-e73fd16c6485	ELE004	Arduino Uno R3	Placa Arduino Uno R3 original	Eletrônicos	UN	\N	0.025	6.80	5.30	1.50	45.90	\N	10.00	100.00	t	f	inativo	2025-10-12 20:24:04.16418+00	2025-10-14 00:52:33.742+00
102fc588-6bac-4ef1-b66b-24617a7c9341	ELE001	Resistor 1kΩ 1/4W	Resistor de carbono 1kΩ 1/4W 5%	Eletrônicos	UN	\N	0.001	0.50	0.20	0.20	0.15	\N	1000.00	10001.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-15 14:12:26.275+00
9b138faf-12a5-486a-ac6e-0166fcace376	PRD0001	PRODUTO TESTE	\N	Outros	G	\N	\N	\N	\N	\N	\N	1000.00	20.00	200.00	f	f	ativo	2025-10-15 18:46:45.486629+00	2025-10-16 03:47:22.486+00
2e20ccfb-9eea-4fa3-904a-2840b462406d	ELE002	Capacitor 100µF 25V	Capacitor eletrolítico 100µF 25V	Eletrônicos	UN	\N	0.003	1.00	0.50	0.50	0.85	\N	500.00	5000.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
8ff1477f-c28a-402b-8d2a-0b7d162ec56b	ELE003	LED 5mm Vermelho	LED vermelho difuso 5mm	Eletrônicos	UN	\N	0.001	0.80	0.50	0.50	0.25	\N	2000.00	20000.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
f00d0830-ddeb-46bd-8731-97cac655da0d	ELE005	Sensor DHT22	Sensor de temperatura e umidade DHT22	Eletrônicos	UN	\N	0.004	2.70	1.50	0.80	18.50	\N	20.00	200.00	t	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
cb6ca7e3-91b6-43c3-91f9-174a95464053	FIX001	Parafuso M4x16	Parafuso sextavado M4x16mm aço inox	Fixação	UN	\N	0.003	1.60	0.70	0.70	0.18	\N	5000.00	50000.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
f970eca6-c7ec-4c39-927b-52982e5d7285	FIX002	Porca M4	Porca sextavada M4 aço inox	Fixação	UN	\N	0.001	0.30	0.70	0.70	0.12	\N	5000.00	50000.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
4bd8c371-05c8-44f7-9088-beba5c017de7	FIX003	Arruela M4	Arruela lisa M4 aço inox	Fixação	UN	\N	0.001	0.10	0.90	0.90	0.08	\N	5000.00	50000.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
80c4120a-5b07-4748-bc8f-f551049adef1	FIX004	Parafuso M6x20	Parafuso sextavado M6x20mm aço carbono	Fixação	UN	\N	0.008	2.00	1.00	1.00	0.25	\N	3000.00	30000.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
ba7a006b-2bfc-4fbe-bc64-55c1f7ca7711	FIX005	Rebite 4mm	Rebite de alumínio 4mm	Fixação	UN	\N	0.002	1.00	0.40	0.40	0.15	\N	2000.00	20000.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
61b6e8bd-e1be-4ebf-bec9-c7881192e98e	FER001	Chave Phillips #2	Chave Phillips #2 cabo emborrachado	Ferramentas	UN	\N	0.120	18.00	3.00	3.00	8.90	\N	5.00	50.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
60c76d84-57d6-4066-9e68-114bedee3319	FER002	Alicate de Corte 6"	Alicate de corte diagonal 6 polegadas	Ferramentas	UN	\N	0.180	15.00	5.50	2.00	24.50	\N	3.00	30.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
55ec3514-8325-4b2c-b996-5423457bd2d7	FER003	Multímetro Digital	Multímetro digital com display LCD	Ferramentas	UN	\N	0.300	14.00	7.00	3.50	89.90	\N	2.00	20.00	t	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
42bd0b5c-3776-4a6c-b7a6-39a59320ea3c	FER004	Ferro de Solda 30W	Ferro de solda 30W 220V com suporte	Ferramentas	UN	\N	0.250	20.00	2.50	2.50	35.00	\N	5.00	50.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
f8ceccae-fe83-47d0-aeed-5391ed316227	FER005	Furadeira 500W	Furadeira de impacto 500W 220V	Ferramentas	UN	\N	1.800	25.00	20.00	8.00	189.00	\N	1.00	10.00	t	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
1bb621e9-f8b6-4052-8018-0cf395e08594	MAT001	Fita Isolante 19mm	Fita isolante PVC 19mm x 20m preta	Materiais	UN	\N	0.100	10.00	2.00	2.00	3.50	\N	50.00	500.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
4e83eb41-e8b0-4515-a748-fe00271dafb2	MAT002	Estanho 60/40 1mm	Estanho para solda 60/40 diâmetro 1mm	Materiais	KG	\N	1.000	3.00	10.00	10.00	85.00	\N	5.00	50.00	t	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
3e44bb57-44a2-4643-9ee3-8be89536c490	MAT003	Cabo Flexível 1mm	Cabo flexível 1mm² rolo 100m vermelho	Materiais	RL	\N	2.500	15.00	15.00	10.00	145.00	\N	10.00	100.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
43d62f0f-e866-4e1f-9e66-3afa8daa3ec1	MAT004	Tubo Termo 3mm	Tubo termo retrátil 3mm preto rolo 5m	Materiais	RL	\N	0.050	10.00	5.00	0.50	12.50	\N	20.00	200.00	f	f	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
b01660de-f0d1-4733-bdf9-71c36eabe2e3	MAT005	Cola Instantânea 3g	Cola instantânea universal 3g	Materiais	UN	\N	0.010	7.00	2.00	0.50	4.90	\N	50.00	500.00	t	t	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
a8c946ed-1339-48b2-8216-d8ad0701e80f	QUI001	Flux para Solda 30ml	Flux para solda em pasta 30ml	Químicos	UN	\N	0.035	10.00	3.00	3.00	12.90	\N	20.00	200.00	t	t	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
27035690-aa0f-44bc-8fbc-c56246cf9c35	QUI002	Álcool Isopropílico 1L	Álcool isopropílico 99% 1 litro	Químicos	L	\N	0.785	20.00	8.00	8.00	28.00	\N	10.00	100.00	f	t	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
08078cf4-8d6c-49b8-a87e-0bd2da481f10	QUI003	Graxa Dielétrica 10g	Graxa dielétrica para contatos 10g	Químicos	UN	\N	0.015	8.00	2.50	2.50	15.50	\N	30.00	300.00	t	t	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
202d8959-a9a7-4d56-acf5-b9cd1f82347a	QUI004	Spray Flux 300ml	Spray flux para eletrônica 300ml	Químicos	UN	\N	0.350	18.00	6.50	6.50	32.00	\N	15.00	150.00	f	t	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
6295a12c-6343-4363-a5f6-adbba3ad798f	QUI005	Tinta Condutiva 5ml	Tinta condutiva prata 5ml	Químicos	UN	\N	0.020	9.00	2.00	2.00	45.00	\N	10.00	100.00	t	t	ativo	2025-10-12 20:24:04.16418+00	2025-10-12 20:24:04.16418+00
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, email, nome_completo, created_at, updated_at, telefone) FROM stdin;
5eb030f8-c483-483e-a7fa-87e79b75ecbb	admin@admin.com	admin	2025-10-12 19:37:36+00	2025-10-12 19:37:43+00	\N
\.


--
-- Data for Name: recebimento_itens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recebimento_itens (id, recebimento_id, produto_id, lote_numero, quantidade_esperada, quantidade_recebida, data_fabricacao, data_validade, localizacao_sugerida, localizacao_confirmada, observacoes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: recebimentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recebimentos (id, numero_documento, fornecedor, data_prevista, data_recebimento, status, observacoes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, user_id, role, created_at, almoxarifado_id) FROM stdin;
\.


--
-- Data for Name: messages_2025_10_13; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_10_13 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_10_14; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_10_14 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_10_15; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_10_15 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_10_16; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_10_16 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_10_17; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_10_17 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_10_18; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_10_18 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_10_19; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_10_19 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-10-11 22:22:10
20211116045059	2025-10-11 22:22:14
20211116050929	2025-10-11 22:22:18
20211116051442	2025-10-11 22:22:21
20211116212300	2025-10-11 22:22:25
20211116213355	2025-10-11 22:22:28
20211116213934	2025-10-11 22:22:31
20211116214523	2025-10-11 22:22:36
20211122062447	2025-10-11 22:22:39
20211124070109	2025-10-11 22:22:43
20211202204204	2025-10-11 22:22:46
20211202204605	2025-10-11 22:22:49
20211210212804	2025-10-11 22:23:00
20211228014915	2025-10-11 22:23:03
20220107221237	2025-10-11 22:23:06
20220228202821	2025-10-11 22:23:09
20220312004840	2025-10-11 22:23:12
20220603231003	2025-10-11 22:23:18
20220603232444	2025-10-11 22:23:21
20220615214548	2025-10-11 22:23:25
20220712093339	2025-10-11 22:23:28
20220908172859	2025-10-11 22:23:31
20220916233421	2025-10-11 22:23:34
20230119133233	2025-10-11 22:23:38
20230128025114	2025-10-11 22:23:42
20230128025212	2025-10-11 22:23:46
20230227211149	2025-10-11 22:23:49
20230228184745	2025-10-11 22:23:52
20230308225145	2025-10-11 22:23:55
20230328144023	2025-10-11 22:23:59
20231018144023	2025-10-11 22:24:03
20231204144023	2025-10-11 22:24:08
20231204144024	2025-10-11 22:24:11
20231204144025	2025-10-11 22:24:14
20240108234812	2025-10-11 22:24:17
20240109165339	2025-10-11 22:24:21
20240227174441	2025-10-11 22:24:27
20240311171622	2025-10-11 22:24:31
20240321100241	2025-10-11 22:24:38
20240401105812	2025-10-11 22:24:47
20240418121054	2025-10-11 22:24:52
20240523004032	2025-10-11 22:25:03
20240618124746	2025-10-11 22:25:06
20240801235015	2025-10-11 22:25:10
20240805133720	2025-10-11 22:25:13
20240827160934	2025-10-11 22:25:16
20240919163303	2025-10-11 22:25:21
20240919163305	2025-10-11 22:25:24
20241019105805	2025-10-11 22:25:27
20241030150047	2025-10-11 22:25:39
20241108114728	2025-10-11 22:25:44
20241121104152	2025-10-11 22:25:47
20241130184212	2025-10-11 22:25:51
20241220035512	2025-10-11 22:25:55
20241220123912	2025-10-11 22:25:58
20241224161212	2025-10-11 22:26:01
20250107150512	2025-10-11 22:26:04
20250110162412	2025-10-11 22:26:08
20250123174212	2025-10-11 22:26:11
20250128220012	2025-10-11 22:26:14
20250506224012	2025-10-11 22:26:17
20250523164012	2025-10-11 22:26:20
20250714121412	2025-10-11 22:26:23
20250905041441	2025-10-11 22:26:26
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-10-11 22:22:04.305532
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-10-11 22:22:04.314561
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-10-11 22:22:04.322848
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-10-11 22:22:04.350485
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-10-11 22:22:04.433382
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-10-11 22:22:04.439412
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-10-11 22:22:04.446798
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-10-11 22:22:04.453216
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-10-11 22:22:04.459143
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-10-11 22:22:04.465237
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-10-11 22:22:04.473447
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-10-11 22:22:04.479918
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-10-11 22:22:04.491338
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-10-11 22:22:04.498147
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-10-11 22:22:04.504548
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-10-11 22:22:04.537386
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-10-11 22:22:04.545173
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-10-11 22:22:04.551516
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-10-11 22:22:04.558508
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-10-11 22:22:04.567535
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-10-11 22:22:04.57372
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-10-11 22:22:04.582049
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-10-11 22:22:04.597959
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-10-11 22:22:04.612655
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-10-11 22:22:04.619665
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-10-11 22:22:04.625618
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-10-11 22:22:04.632011
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-10-11 22:22:04.645609
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-10-11 22:22:04.892746
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-10-11 22:22:04.899727
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-10-11 22:22:04.905523
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-10-11 22:22:04.913033
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-10-11 22:22:04.921602
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-10-11 22:22:04.929123
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-10-11 22:22:04.931329
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-10-11 22:22:04.938687
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-10-11 22:22:04.944587
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-10-11 22:22:04.952632
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-10-11 22:22:04.959188
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-10-11 22:22:04.970795
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-10-11 22:22:04.977537
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-10-11 22:22:04.986702
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-10-11 22:22:04.994747
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-10-11 22:22:05.003039
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20251011055216	{"-- Tipos enum para o sistema\r\nCREATE TYPE public.app_role AS ENUM ('admin', 'gestor', 'supervisor', 'conferente', 'estoquista')","CREATE TYPE public.tipo_movimentacao AS ENUM ('entrada', 'saida', 'transferencia', 'ajuste', 'devolucao')","CREATE TYPE public.status_produto AS ENUM ('ativo', 'inativo', 'bloqueado')","CREATE TYPE public.tipo_localizacao AS ENUM ('picking', 'bulk', 'quarentena', 'expedicao')","-- Tabela de perfis de usuário\r\nCREATE TABLE public.profiles (\r\n  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,\r\n  nome_completo TEXT NOT NULL,\r\n  email TEXT NOT NULL,\r\n  telefone TEXT,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\r\n)","-- Tabela de roles de usuário\r\nCREATE TABLE public.user_roles (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  role public.app_role NOT NULL,\r\n  almoxarifado_id UUID,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  UNIQUE(user_id, role, almoxarifado_id)\r\n)","-- Tabela de almoxarifados\r\nCREATE TABLE public.almoxarifados (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  codigo TEXT NOT NULL UNIQUE,\r\n  nome TEXT NOT NULL,\r\n  endereco TEXT,\r\n  ativo BOOLEAN NOT NULL DEFAULT true,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\r\n)","-- Tabela de localizações\r\nCREATE TABLE public.localizacoes (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  almoxarifado_id UUID NOT NULL REFERENCES public.almoxarifados(id) ON DELETE CASCADE,\r\n  codigo TEXT NOT NULL,\r\n  rua TEXT NOT NULL,\r\n  prateleira TEXT NOT NULL,\r\n  nivel TEXT NOT NULL,\r\n  box TEXT NOT NULL,\r\n  tipo public.tipo_localizacao NOT NULL DEFAULT 'picking',\r\n  capacidade_maxima DECIMAL(10,2),\r\n  ativo BOOLEAN NOT NULL DEFAULT true,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  UNIQUE(almoxarifado_id, rua, prateleira, nivel, box)\r\n)","-- Tabela de produtos\r\nCREATE TABLE public.produtos (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  sku TEXT NOT NULL UNIQUE,\r\n  nome TEXT NOT NULL,\r\n  descricao TEXT,\r\n  categoria TEXT,\r\n  unidade TEXT NOT NULL DEFAULT 'UN',\r\n  codigo_barras TEXT,\r\n  codigo_ean TEXT,\r\n  peso_kg DECIMAL(10,3),\r\n  altura_cm DECIMAL(10,2),\r\n  largura_cm DECIMAL(10,2),\r\n  profundidade_cm DECIMAL(10,2),\r\n  custo_unitario DECIMAL(10,2),\r\n  preco_venda DECIMAL(10,2),\r\n  estoque_minimo INTEGER DEFAULT 0,\r\n  estoque_maximo INTEGER,\r\n  foto_url TEXT,\r\n  controla_lote BOOLEAN NOT NULL DEFAULT false,\r\n  controla_validade BOOLEAN NOT NULL DEFAULT false,\r\n  status public.status_produto NOT NULL DEFAULT 'ativo',\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  created_by UUID REFERENCES public.profiles(id)\r\n)","-- Tabela de lotes\r\nCREATE TABLE public.lotes (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,\r\n  numero_lote TEXT NOT NULL,\r\n  data_fabricacao DATE,\r\n  data_validade DATE,\r\n  quantidade_inicial DECIMAL(10,2) NOT NULL,\r\n  quantidade_atual DECIMAL(10,2) NOT NULL,\r\n  bloqueado BOOLEAN NOT NULL DEFAULT false,\r\n  motivo_bloqueio TEXT,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  UNIQUE(produto_id, numero_lote)\r\n)","-- Tabela de estoque por localização\r\nCREATE TABLE public.estoque_localizacao (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,\r\n  localizacao_id UUID NOT NULL REFERENCES public.localizacoes(id) ON DELETE CASCADE,\r\n  lote_id UUID REFERENCES public.lotes(id) ON DELETE SET NULL,\r\n  quantidade DECIMAL(10,2) NOT NULL DEFAULT 0,\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  UNIQUE(produto_id, localizacao_id, lote_id)\r\n)","-- Tabela de movimentações\r\nCREATE TABLE public.movimentacoes (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  tipo public.tipo_movimentacao NOT NULL,\r\n  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE RESTRICT,\r\n  lote_id UUID REFERENCES public.lotes(id) ON DELETE SET NULL,\r\n  localizacao_origem_id UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,\r\n  localizacao_destino_id UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,\r\n  quantidade DECIMAL(10,2) NOT NULL,\r\n  documento TEXT,\r\n  observacao TEXT,\r\n  realizada_por UUID NOT NULL REFERENCES public.profiles(id),\r\n  realizada_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  custo_unitario DECIMAL(10,2),\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\r\n)","-- Índices para performance\r\nCREATE INDEX idx_movimentacoes_produto ON public.movimentacoes(produto_id)","CREATE INDEX idx_movimentacoes_realizada_em ON public.movimentacoes(realizada_em DESC)","CREATE INDEX idx_movimentacoes_tipo ON public.movimentacoes(tipo)","CREATE INDEX idx_estoque_produto ON public.estoque_localizacao(produto_id)","CREATE INDEX idx_estoque_localizacao ON public.estoque_localizacao(localizacao_id)","CREATE INDEX idx_lotes_produto ON public.lotes(produto_id)","CREATE INDEX idx_lotes_validade ON public.lotes(data_validade)","-- Enable RLS\r\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY","ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY","ALTER TABLE public.almoxarifados ENABLE ROW LEVEL SECURITY","ALTER TABLE public.localizacoes ENABLE ROW LEVEL SECURITY","ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY","ALTER TABLE public.lotes ENABLE ROW LEVEL SECURITY","ALTER TABLE public.estoque_localizacao ENABLE ROW LEVEL SECURITY","ALTER TABLE public.movimentacoes ENABLE ROW LEVEL SECURITY","-- Função para verificar role do usuário\r\nCREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)\r\nRETURNS BOOLEAN\r\nLANGUAGE SQL\r\nSTABLE\r\nSECURITY DEFINER\r\nSET search_path = public\r\nAS $$\r\n  SELECT EXISTS (\r\n    SELECT 1\r\n    FROM public.user_roles\r\n    WHERE user_id = _user_id AND role = _role\r\n  )\r\n$$","-- RLS Policies para profiles\r\nCREATE POLICY \\"Usuários podem ver todos os perfis\\" ON public.profiles FOR SELECT USING (true)","CREATE POLICY \\"Usuários podem atualizar próprio perfil\\" ON public.profiles FOR UPDATE USING (auth.uid() = id)","CREATE POLICY \\"Sistema pode inserir perfis\\" ON public.profiles FOR INSERT WITH CHECK (true)","-- RLS Policies para user_roles\r\nCREATE POLICY \\"Admins e gestores podem ver roles\\" ON public.user_roles FOR SELECT \r\n  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'))","CREATE POLICY \\"Admins podem gerenciar roles\\" ON public.user_roles FOR ALL \r\n  USING (public.has_role(auth.uid(), 'admin'))","-- RLS Policies para almoxarifados\r\nCREATE POLICY \\"Todos podem ver almoxarifados\\" ON public.almoxarifados FOR SELECT USING (true)","CREATE POLICY \\"Admins e gestores podem gerenciar almoxarifados\\" ON public.almoxarifados FOR ALL \r\n  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'))","-- RLS Policies para localizações\r\nCREATE POLICY \\"Todos podem ver localizações\\" ON public.localizacoes FOR SELECT USING (true)","CREATE POLICY \\"Supervisores+ podem gerenciar localizações\\" ON public.localizacoes FOR ALL \r\n  USING (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'gestor') OR \r\n    public.has_role(auth.uid(), 'supervisor')\r\n  )","-- RLS Policies para produtos\r\nCREATE POLICY \\"Todos podem ver produtos\\" ON public.produtos FOR SELECT USING (true)","CREATE POLICY \\"Supervisores+ podem gerenciar produtos\\" ON public.produtos FOR INSERT \r\n  WITH CHECK (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'gestor') OR \r\n    public.has_role(auth.uid(), 'supervisor')\r\n  )","CREATE POLICY \\"Supervisores+ podem atualizar produtos\\" ON public.produtos FOR UPDATE \r\n  USING (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'gestor') OR \r\n    public.has_role(auth.uid(), 'supervisor')\r\n  )","-- RLS Policies para lotes\r\nCREATE POLICY \\"Todos podem ver lotes\\" ON public.lotes FOR SELECT USING (true)","CREATE POLICY \\"Conferentes+ podem gerenciar lotes\\" ON public.lotes FOR ALL \r\n  USING (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'gestor') OR \r\n    public.has_role(auth.uid(), 'supervisor') OR\r\n    public.has_role(auth.uid(), 'conferente')\r\n  )","-- RLS Policies para estoque\r\nCREATE POLICY \\"Todos podem ver estoque\\" ON public.estoque_localizacao FOR SELECT USING (true)","CREATE POLICY \\"Estoquistas+ podem gerenciar estoque\\" ON public.estoque_localizacao FOR ALL \r\n  USING (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'gestor') OR \r\n    public.has_role(auth.uid(), 'supervisor') OR\r\n    public.has_role(auth.uid(), 'conferente') OR\r\n    public.has_role(auth.uid(), 'estoquista')\r\n  )","-- RLS Policies para movimentações\r\nCREATE POLICY \\"Todos podem ver movimentações\\" ON public.movimentacoes FOR SELECT USING (true)","CREATE POLICY \\"Estoquistas+ podem registrar movimentações\\" ON public.movimentacoes FOR INSERT \r\n  WITH CHECK (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'gestor') OR \r\n    public.has_role(auth.uid(), 'supervisor') OR\r\n    public.has_role(auth.uid(), 'conferente') OR\r\n    public.has_role(auth.uid(), 'estoquista')\r\n  )","-- Trigger para criar perfil ao criar usuário\r\nCREATE OR REPLACE FUNCTION public.handle_new_user()\r\nRETURNS TRIGGER\r\nLANGUAGE PLPGSQL\r\nSECURITY DEFINER\r\nSET search_path = public\r\nAS $$\r\nBEGIN\r\n  INSERT INTO public.profiles (id, nome_completo, email)\r\n  VALUES (\r\n    NEW.id,\r\n    COALESCE(NEW.raw_user_meta_data->>'nome_completo', NEW.email),\r\n    NEW.email\r\n  );\r\n  RETURN NEW;\r\nEND;\r\n$$","CREATE TRIGGER on_auth_user_created\r\n  AFTER INSERT ON auth.users\r\n  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user()","-- Trigger para atualizar updated_at\r\nCREATE OR REPLACE FUNCTION public.handle_updated_at()\r\nRETURNS TRIGGER\r\nLANGUAGE PLPGSQL\r\nAS $$\r\nBEGIN\r\n  NEW.updated_at = NOW();\r\n  RETURN NEW;\r\nEND;\r\n$$","CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles\r\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER update_almoxarifados_updated_at BEFORE UPDATE ON public.almoxarifados\r\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER update_localizacoes_updated_at BEFORE UPDATE ON public.localizacoes\r\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON public.produtos\r\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER update_lotes_updated_at BEFORE UPDATE ON public.lotes\r\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER update_estoque_updated_at BEFORE UPDATE ON public.estoque_localizacao\r\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()"}	b1c75494-265a-4fba-9e44-e7a52c416a3b
20251012	{"-- =====================================================\n-- SCRIPT DE MIGRAÇÃO COMPLETA PARA SUPABASE\n-- Projeto: Armazém Vivo WMS\n-- Data: 2024\n-- =====================================================\n\n-- Habilitar extensões necessárias\nCREATE EXTENSION IF NOT EXISTS \\"uuid-ossp\\"","-- =====================================================\n-- 1. CRIAÇÃO DE TIPOS ENUM (com verificação)\n-- =====================================================\n\n-- Tipo para roles de usuário\nDO $$ BEGIN\n    CREATE TYPE app_role AS ENUM ('admin', 'operador', 'visualizador');\nEXCEPTION\n    WHEN duplicate_object THEN null;\nEND $$","-- Tipo para status de produto\nDO $$ BEGIN\n    CREATE TYPE produto_status AS ENUM ('ativo', 'inativo', 'bloqueado');\nEXCEPTION\n    WHEN duplicate_object THEN null;\nEND $$","-- Tipo para status de lote\nDO $$ BEGIN\n    CREATE TYPE lote_status AS ENUM ('disponivel', 'reservado', 'bloqueado', 'vencido');\nEXCEPTION\n    WHEN duplicate_object THEN null;\nEND $$","-- Tipo para status de recebimento\nDO $$ BEGIN\n    CREATE TYPE recebimento_status AS ENUM ('pendente', 'em_andamento', 'concluido', 'cancelado');\nEXCEPTION\n    WHEN duplicate_object THEN null;\nEND $$","-- Tipo para tipo de movimentação\nDO $$ BEGIN\n    CREATE TYPE movimentacao_tipo AS ENUM ('entrada', 'saida', 'transferencia', 'ajuste', 'inventario');\nEXCEPTION\n    WHEN duplicate_object THEN null;\nEND $$","-- =====================================================\n-- 2. CRIAÇÃO DE TABELAS (com verificação)\n-- =====================================================\n\n-- Tabela de perfis de usuário\nCREATE TABLE IF NOT EXISTS profiles (\n    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,\n    email TEXT UNIQUE NOT NULL,\n    full_name TEXT,\n    role app_role DEFAULT 'operador',\n    avatar_url TEXT,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n)","-- Tabela de roles de usuário (para controle granular)\nCREATE TABLE IF NOT EXISTS user_roles (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,\n    role app_role NOT NULL,\n    granted_by UUID REFERENCES profiles(id),\n    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    expires_at TIMESTAMP WITH TIME ZONE,\n    is_active BOOLEAN DEFAULT true,\n    UNIQUE(user_id, role)\n)","-- Tabela de almoxarifados\nCREATE TABLE IF NOT EXISTS almoxarifados (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    nome VARCHAR(100) NOT NULL,\n    descricao TEXT,\n    endereco TEXT,\n    responsavel_id UUID REFERENCES profiles(id),\n    ativo BOOLEAN DEFAULT true,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n)","-- Tabela de localizações\nCREATE TABLE IF NOT EXISTS localizacoes (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    almoxarifado_id UUID REFERENCES almoxarifados(id) ON DELETE CASCADE,\n    codigo VARCHAR(50) NOT NULL,\n    descricao TEXT,\n    tipo VARCHAR(50), -- 'corredor', 'prateleira', 'gaveta', etc.\n    capacidade_maxima INTEGER,\n    ativo BOOLEAN DEFAULT true,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    UNIQUE(almoxarifado_id, codigo)\n)","-- Tabela de produtos\nCREATE TABLE IF NOT EXISTS produtos (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    sku VARCHAR(100) UNIQUE NOT NULL,\n    nome VARCHAR(200) NOT NULL,\n    descricao TEXT,\n    categoria VARCHAR(100),\n    unidade_medida VARCHAR(20) DEFAULT 'UN',\n    peso_unitario DECIMAL(10,3),\n    dimensoes JSONB, -- {altura, largura, profundidade}\n    valor_unitario DECIMAL(15,2),\n    estoque_minimo INTEGER DEFAULT 0,\n    estoque_maximo INTEGER,\n    status produto_status DEFAULT 'ativo',\n    observacoes TEXT,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n)","-- Tabela de lotes\nCREATE TABLE IF NOT EXISTS lotes (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,\n    numero_lote VARCHAR(100) NOT NULL,\n    data_fabricacao DATE,\n    data_validade DATE,\n    quantidade_inicial INTEGER NOT NULL DEFAULT 0,\n    quantidade_atual INTEGER NOT NULL DEFAULT 0,\n    status lote_status DEFAULT 'disponivel',\n    observacoes TEXT,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    UNIQUE(produto_id, numero_lote)\n)","-- Tabela de estoque por localização\nCREATE TABLE IF NOT EXISTS estoque_localizacao (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,\n    lote_id UUID REFERENCES lotes(id) ON DELETE CASCADE,\n    localizacao_id UUID REFERENCES localizacoes(id) ON DELETE CASCADE,\n    quantidade INTEGER NOT NULL DEFAULT 0,\n    data_ultima_movimentacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    UNIQUE(produto_id, lote_id, localizacao_id)\n)","-- Tabela de recebimentos\nCREATE TABLE IF NOT EXISTS recebimentos (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    numero_documento VARCHAR(100) UNIQUE NOT NULL,\n    fornecedor VARCHAR(200),\n    data_recebimento DATE NOT NULL,\n    data_prevista DATE,\n    status recebimento_status DEFAULT 'pendente',\n    observacoes TEXT,\n    usuario_id UUID REFERENCES profiles(id),\n    almoxarifado_id UUID REFERENCES almoxarifados(id),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n)","-- Tabela de itens de recebimento\nCREATE TABLE IF NOT EXISTS recebimento_itens (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    recebimento_id UUID REFERENCES recebimentos(id) ON DELETE CASCADE,\n    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,\n    lote_id UUID REFERENCES lotes(id),\n    quantidade_esperada INTEGER NOT NULL,\n    quantidade_recebida INTEGER DEFAULT 0,\n    valor_unitario DECIMAL(15,2),\n    observacoes TEXT,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n)","-- Tabela de movimentações\nCREATE TABLE IF NOT EXISTS movimentacoes (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,\n    lote_id UUID REFERENCES lotes(id),\n    localizacao_origem_id UUID REFERENCES localizacoes(id),\n    localizacao_destino_id UUID REFERENCES localizacoes(id),\n    tipo movimentacao_tipo NOT NULL,\n    quantidade INTEGER NOT NULL,\n    motivo TEXT,\n    documento_referencia VARCHAR(100),\n    usuario_id UUID REFERENCES profiles(id),\n    data_movimentacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n)","-- =====================================================\n-- 3. CRIAÇÃO DE ÍNDICES (com verificação)\n-- =====================================================\n\n-- Índices para produtos\nCREATE INDEX IF NOT EXISTS idx_produtos_sku ON produtos(sku)","CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria)","CREATE INDEX IF NOT EXISTS idx_produtos_status ON produtos(status)","-- Índices para lotes\nCREATE INDEX IF NOT EXISTS idx_lotes_produto_id ON lotes(produto_id)","CREATE INDEX IF NOT EXISTS idx_lotes_numero ON lotes(numero_lote)","CREATE INDEX IF NOT EXISTS idx_lotes_validade ON lotes(data_validade)","-- Índices para estoque\nCREATE INDEX IF NOT EXISTS idx_estoque_produto_id ON estoque_localizacao(produto_id)","CREATE INDEX IF NOT EXISTS idx_estoque_localizacao_id ON estoque_localizacao(localizacao_id)","CREATE INDEX IF NOT EXISTS idx_estoque_lote_id ON estoque_localizacao(lote_id)","-- Índices para movimentações\nCREATE INDEX IF NOT EXISTS idx_movimentacoes_produto_id ON movimentacoes(produto_id)","CREATE INDEX IF NOT EXISTS idx_movimentacoes_data ON movimentacoes(data_movimentacao)","CREATE INDEX IF NOT EXISTS idx_movimentacoes_tipo ON movimentacoes(tipo)","-- Índices para recebimentos\nCREATE INDEX IF NOT EXISTS idx_recebimentos_data ON recebimentos(data_recebimento)","CREATE INDEX IF NOT EXISTS idx_recebimentos_status ON recebimentos(status)","CREATE INDEX IF NOT EXISTS idx_recebimentos_almoxarifado ON recebimentos(almoxarifado_id)","-- =====================================================\n-- 4. POLÍTICAS RLS (Row Level Security)\n-- =====================================================\n\n-- Habilitar RLS nas tabelas\nALTER TABLE profiles ENABLE ROW LEVEL SECURITY","ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY","ALTER TABLE almoxarifados ENABLE ROW LEVEL SECURITY","ALTER TABLE localizacoes ENABLE ROW LEVEL SECURITY","ALTER TABLE produtos ENABLE ROW LEVEL SECURITY","ALTER TABLE lotes ENABLE ROW LEVEL SECURITY","ALTER TABLE estoque_localizacao ENABLE ROW LEVEL SECURITY","ALTER TABLE recebimentos ENABLE ROW LEVEL SECURITY","ALTER TABLE recebimento_itens ENABLE ROW LEVEL SECURITY","ALTER TABLE movimentacoes ENABLE ROW LEVEL SECURITY","-- Políticas básicas (permitir acesso autenticado)\nCREATE POLICY IF NOT EXISTS \\"Usuários podem ver próprio perfil\\" ON profiles\n    FOR SELECT USING (auth.uid() = id)","CREATE POLICY IF NOT EXISTS \\"Usuários podem atualizar próprio perfil\\" ON profiles\n    FOR UPDATE USING (auth.uid() = id)","-- Políticas para outras tabelas (acesso geral para usuários autenticados)\nCREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON almoxarifados\n    FOR ALL USING (auth.role() = 'authenticated')","CREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON localizacoes\n    FOR ALL USING (auth.role() = 'authenticated')","CREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON produtos\n    FOR ALL USING (auth.role() = 'authenticated')","CREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON lotes\n    FOR ALL USING (auth.role() = 'authenticated')","CREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON estoque_localizacao\n    FOR ALL USING (auth.role() = 'authenticated')","CREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON recebimentos\n    FOR ALL USING (auth.role() = 'authenticated')","CREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON recebimento_itens\n    FOR ALL USING (auth.role() = 'authenticated')","CREATE POLICY IF NOT EXISTS \\"Acesso autenticado\\" ON movimentacoes\n    FOR ALL USING (auth.role() = 'authenticated')","-- =====================================================\n-- 5. DADOS DE EXEMPLO\n-- =====================================================\n\n-- Inserir almoxarifado exemplo (se não existir)\nINSERT INTO almoxarifados (id, nome, descricao, endereco, ativo)\nSELECT \n    '550e8400-e29b-41d4-a716-446655440001'::uuid,\n    'Almoxarifado Central',\n    'Almoxarifado principal da empresa',\n    'Rua Principal, 123 - Centro',\n    true\nWHERE NOT EXISTS (\n    SELECT 1 FROM almoxarifados WHERE nome = 'Almoxarifado Central'\n)","-- Inserir localizações exemplo (se não existirem)\nINSERT INTO localizacoes (id, almoxarifado_id, codigo, descricao, tipo, capacidade_maxima, ativo)\nSELECT * FROM (VALUES\n    ('550e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'A01-01', 'Corredor A, Prateleira 1, Nível 1', 'prateleira', 100, true),\n    ('550e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'A01-02', 'Corredor A, Prateleira 1, Nível 2', 'prateleira', 100, true),\n    ('550e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'B01-01', 'Corredor B, Prateleira 1, Nível 1', 'prateleira', 150, true)\n) AS v(id, almoxarifado_id, codigo, descricao, tipo, capacidade_maxima, ativo)\nWHERE NOT EXISTS (\n    SELECT 1 FROM localizacoes WHERE codigo = v.codigo AND almoxarifado_id = v.almoxarifado_id\n)","-- Inserir produtos exemplo (se não existirem)\nINSERT INTO produtos (id, sku, nome, descricao, categoria, unidade_medida, peso_unitario, valor_unitario, estoque_minimo, estoque_maximo, status)\nSELECT * FROM (VALUES\n    ('550e8400-e29b-41d4-a716-446655440005'::uuid, 'PROD001', 'Parafuso Phillips M6x20', 'Parafuso Phillips cabeça panela M6 x 20mm', 'Fixação', 'UN', 0.015, 0.25, 100, 1000, 'ativo'::produto_status),\n    ('550e8400-e29b-41d4-a716-446655440006'::uuid, 'PROD002', 'Porca Sextavada M6', 'Porca sextavada zincada M6', 'Fixação', 'UN', 0.008, 0.15, 200, 2000, 'ativo'::produto_status),\n    ('550e8400-e29b-41d4-a716-446655440007'::uuid, 'PROD003', 'Arruela Lisa M6', 'Arruela lisa zincada M6', 'Fixação', 'UN', 0.003, 0.05, 500, 5000, 'ativo'::produto_status)\n) AS v(id, sku, nome, descricao, categoria, unidade_medida, peso_unitario, valor_unitario, estoque_minimo, estoque_maximo, status)\nWHERE NOT EXISTS (\n    SELECT 1 FROM produtos WHERE sku = v.sku\n)","-- Inserir lotes exemplo (se não existirem)\nINSERT INTO lotes (id, produto_id, numero_lote, data_fabricacao, data_validade, quantidade_inicial, quantidade_atual, status)\nSELECT * FROM (VALUES\n    ('550e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'LOTE001-2024', '2024-01-15', '2026-01-15', 500, 500, 'disponivel'::lote_status),\n    ('550e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440006'::uuid, 'LOTE002-2024', '2024-01-20', '2026-01-20', 1000, 1000, 'disponivel'::lote_status),\n    ('550e8400-e29b-41d4-a716-44665544000a'::uuid, '550e8400-e29b-41d4-a716-446655440007'::uuid, 'LOTE003-2024', '2024-01-25', '2026-01-25', 2000, 2000, 'disponivel'::lote_status)\n) AS v(id, produto_id, numero_lote, data_fabricacao, data_validade, quantidade_inicial, quantidade_atual, status)\nWHERE NOT EXISTS (\n    SELECT 1 FROM lotes WHERE numero_lote = v.numero_lote AND produto_id = v.produto_id\n)","-- Inserir estoque por localização (se não existir)\nINSERT INTO estoque_localizacao (produto_id, lote_id, localizacao_id, quantidade)\nSELECT * FROM (VALUES\n    ('550e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 500),\n    ('550e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 1000),\n    ('550e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-44665544000a'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 2000)\n) AS v(produto_id, lote_id, localizacao_id, quantidade)\nWHERE NOT EXISTS (\n    SELECT 1 FROM estoque_localizacao \n    WHERE produto_id = v.produto_id AND lote_id = v.lote_id AND localizacao_id = v.localizacao_id\n)","-- Inserir recebimento exemplo (se não existir)\nINSERT INTO recebimentos (id, numero_documento, fornecedor, data_recebimento, data_prevista, status, observacoes)\nSELECT \n    '550e8400-e29b-41d4-a716-44665544000b'::uuid,\n    'REC-2024-001',\n    'Fornecedor ABC Ltda',\n    '2024-01-15',\n    '2024-01-15',\n    'concluido'::recebimento_status,\n    'Recebimento inicial de estoque'\nWHERE NOT EXISTS (\n    SELECT 1 FROM recebimentos WHERE numero_documento = 'REC-2024-001'\n)","-- =====================================================\n-- SCRIPT EXECUTADO COM SUCESSO!\n-- =====================================================\n\n-- Verificar se tudo foi criado corretamente\nSELECT 'Migração executada com sucesso!' as status,\n       (SELECT COUNT(*) FROM produtos) as total_produtos,\n       (SELECT COUNT(*) FROM almoxarifados) as total_almoxarifados,\n       (SELECT COUNT(*) FROM localizacoes) as total_localizacoes,\n       (SELECT COUNT(*) FROM lotes) as total_lotes"}	migracao_completa_sistema
20241211	{"-- Criação das tabelas para o módulo de Recebimentos\n\n-- Enum para status de recebimento\nCREATE TYPE public.status_recebimento AS ENUM ('pendente', 'em_conferencia', 'conferido', 'finalizado')","-- Tabela principal de recebimentos\nCREATE TABLE public.recebimentos (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  numero_documento TEXT NOT NULL UNIQUE,\n  fornecedor TEXT NOT NULL,\n  data_prevista DATE NOT NULL,\n  data_recebimento TIMESTAMPTZ,\n  status public.status_recebimento NOT NULL DEFAULT 'pendente',\n  observacoes TEXT,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  created_by UUID REFERENCES public.profiles(id)\n)","-- Tabela de itens do recebimento\nCREATE TABLE public.recebimento_itens (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  recebimento_id UUID NOT NULL REFERENCES public.recebimentos(id) ON DELETE CASCADE,\n  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE RESTRICT,\n  lote_numero TEXT NOT NULL,\n  quantidade_esperada DECIMAL(10,2) NOT NULL DEFAULT 0,\n  quantidade_recebida DECIMAL(10,2) NOT NULL DEFAULT 0,\n  data_fabricacao DATE,\n  data_validade DATE,\n  localizacao_sugerida UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,\n  localizacao_confirmada UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,\n  observacoes TEXT,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n)","-- Índices para performance\nCREATE INDEX idx_recebimentos_status ON public.recebimentos(status)","CREATE INDEX idx_recebimentos_data_prevista ON public.recebimentos(data_prevista)","CREATE INDEX idx_recebimentos_fornecedor ON public.recebimentos(fornecedor)","CREATE INDEX idx_recebimento_itens_recebimento ON public.recebimento_itens(recebimento_id)","CREATE INDEX idx_recebimento_itens_produto ON public.recebimento_itens(produto_id)","CREATE INDEX idx_recebimento_itens_lote ON public.recebimento_itens(lote_numero)","-- Enable RLS\nALTER TABLE public.recebimentos ENABLE ROW LEVEL SECURITY","ALTER TABLE public.recebimento_itens ENABLE ROW LEVEL SECURITY","-- Triggers para updated_at\nCREATE TRIGGER update_recebimentos_updated_at \n  BEFORE UPDATE ON public.recebimentos\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER update_recebimento_itens_updated_at \n  BEFORE UPDATE ON public.recebimento_itens\n  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()","-- Políticas RLS básicas (permitir tudo para usuários autenticados por enquanto)\nCREATE POLICY \\"Usuários autenticados podem ver recebimentos\\" ON public.recebimentos\n  FOR SELECT USING (auth.role() = 'authenticated')","CREATE POLICY \\"Usuários autenticados podem inserir recebimentos\\" ON public.recebimentos\n  FOR INSERT WITH CHECK (auth.role() = 'authenticated')","CREATE POLICY \\"Usuários autenticados podem atualizar recebimentos\\" ON public.recebimentos\n  FOR UPDATE USING (auth.role() = 'authenticated')","CREATE POLICY \\"Usuários autenticados podem deletar recebimentos\\" ON public.recebimentos\n  FOR DELETE USING (auth.role() = 'authenticated')","CREATE POLICY \\"Usuários autenticados podem ver itens de recebimento\\" ON public.recebimento_itens\n  FOR SELECT USING (auth.role() = 'authenticated')","CREATE POLICY \\"Usuários autenticados podem inserir itens de recebimento\\" ON public.recebimento_itens\n  FOR INSERT WITH CHECK (auth.role() = 'authenticated')","CREATE POLICY \\"Usuários autenticados podem atualizar itens de recebimento\\" ON public.recebimento_itens\n  FOR UPDATE USING (auth.role() = 'authenticated')","CREATE POLICY \\"Usuários autenticados podem deletar itens de recebimento\\" ON public.recebimento_itens\n  FOR DELETE USING (auth.role() = 'authenticated')","-- Função para criar movimentações automaticamente quando um recebimento é finalizado\nCREATE OR REPLACE FUNCTION public.processar_recebimento_finalizado()\nRETURNS TRIGGER AS $$\nBEGIN\n  -- Só processa se o status mudou para 'finalizado'\n  IF NEW.status = 'finalizado' AND OLD.status != 'finalizado' THEN\n    -- Criar movimentações de entrada para cada item do recebimento\n    INSERT INTO public.movimentacoes (\n      tipo,\n      produto_id,\n      lote_id,\n      localizacao_destino_id,\n      quantidade,\n      documento,\n      observacao,\n      realizada_por\n    )\n    SELECT \n      'entrada'::public.tipo_movimentacao,\n      ri.produto_id,\n      l.id, -- lote_id (será criado se não existir)\n      ri.localizacao_confirmada,\n      ri.quantidade_recebida,\n      NEW.numero_documento,\n      'Recebimento finalizado: ' || COALESCE(ri.observacoes, ''),\n      NEW.created_by\n    FROM public.recebimento_itens ri\n    LEFT JOIN public.lotes l ON (l.produto_id = ri.produto_id AND l.numero_lote = ri.lote_numero)\n    WHERE ri.recebimento_id = NEW.id\n      AND ri.quantidade_recebida > 0\n      AND ri.localizacao_confirmada IS NOT NULL;\n\n    -- Criar ou atualizar lotes\n    INSERT INTO public.lotes (\n      produto_id,\n      numero_lote,\n      data_fabricacao,\n      data_validade,\n      quantidade_inicial,\n      quantidade_atual\n    )\n    SELECT \n      ri.produto_id,\n      ri.lote_numero,\n      ri.data_fabricacao,\n      ri.data_validade,\n      ri.quantidade_recebida,\n      ri.quantidade_recebida\n    FROM public.recebimento_itens ri\n    WHERE ri.recebimento_id = NEW.id\n      AND ri.quantidade_recebida > 0\n    ON CONFLICT (produto_id, numero_lote) \n    DO UPDATE SET\n      quantidade_atual = public.lotes.quantidade_atual + EXCLUDED.quantidade_inicial,\n      updated_at = NOW();\n\n    -- Atualizar estoque por localização\n    INSERT INTO public.estoque_localizacao (\n      produto_id,\n      localizacao_id,\n      lote_id,\n      quantidade\n    )\n    SELECT \n      ri.produto_id,\n      ri.localizacao_confirmada,\n      l.id,\n      ri.quantidade_recebida\n    FROM public.recebimento_itens ri\n    JOIN public.lotes l ON (l.produto_id = ri.produto_id AND l.numero_lote = ri.lote_numero)\n    WHERE ri.recebimento_id = NEW.id\n      AND ri.quantidade_recebida > 0\n      AND ri.localizacao_confirmada IS NOT NULL\n    ON CONFLICT (produto_id, localizacao_id, lote_id)\n    DO UPDATE SET\n      quantidade = public.estoque_localizacao.quantidade + EXCLUDED.quantidade,\n      updated_at = NOW();\n  END IF;\n\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql","-- Trigger para processar recebimento finalizado\nCREATE TRIGGER trigger_processar_recebimento_finalizado\n  AFTER UPDATE ON public.recebimentos\n  FOR EACH ROW\n  EXECUTE FUNCTION public.processar_recebimento_finalizado()"}	recebimentos
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 107, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: alertas_estoque alertas_estoque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas_estoque
    ADD CONSTRAINT alertas_estoque_pkey PRIMARY KEY (id);


--
-- Name: almoxarifados almoxarifados_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almoxarifados
    ADD CONSTRAINT almoxarifados_codigo_key UNIQUE (codigo);


--
-- Name: almoxarifados almoxarifados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almoxarifados
    ADD CONSTRAINT almoxarifados_pkey PRIMARY KEY (id);


--
-- Name: estoque_localizacao estoque_localizacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque_localizacao
    ADD CONSTRAINT estoque_localizacao_pkey PRIMARY KEY (id);


--
-- Name: estoque_localizacao estoque_localizacao_produto_id_localizacao_id_lote_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque_localizacao
    ADD CONSTRAINT estoque_localizacao_produto_id_localizacao_id_lote_id_key UNIQUE (produto_id, localizacao_id, lote_id);


--
-- Name: historico_estoque historico_estoque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historico_estoque
    ADD CONSTRAINT historico_estoque_pkey PRIMARY KEY (id);


--
-- Name: localizacoes localizacoes_almoxarifado_id_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localizacoes
    ADD CONSTRAINT localizacoes_almoxarifado_id_codigo_key UNIQUE (almoxarifado_id, codigo);


--
-- Name: localizacoes localizacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localizacoes
    ADD CONSTRAINT localizacoes_pkey PRIMARY KEY (id);


--
-- Name: lotes lotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_pkey PRIMARY KEY (id);


--
-- Name: lotes lotes_produto_id_numero_lote_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_produto_id_numero_lote_key UNIQUE (produto_id, numero_lote);


--
-- Name: movimentacoes movimentacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimentacoes
    ADD CONSTRAINT movimentacoes_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_sku_key UNIQUE (sku);


--
-- Name: profiles profiles_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_email_key UNIQUE (email);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: recebimento_itens recebimento_itens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recebimento_itens
    ADD CONSTRAINT recebimento_itens_pkey PRIMARY KEY (id);


--
-- Name: recebimentos recebimentos_numero_documento_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recebimentos
    ADD CONSTRAINT recebimentos_numero_documento_key UNIQUE (numero_documento);


--
-- Name: recebimentos recebimentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recebimentos
    ADD CONSTRAINT recebimentos_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_10_13 messages_2025_10_13_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_10_13
    ADD CONSTRAINT messages_2025_10_13_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_10_14 messages_2025_10_14_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_10_14
    ADD CONSTRAINT messages_2025_10_14_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_10_15 messages_2025_10_15_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_10_15
    ADD CONSTRAINT messages_2025_10_15_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_10_16 messages_2025_10_16_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_10_16
    ADD CONSTRAINT messages_2025_10_16_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_10_17 messages_2025_10_17_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_10_17
    ADD CONSTRAINT messages_2025_10_17_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_10_18 messages_2025_10_18_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_10_18
    ADD CONSTRAINT messages_2025_10_18_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_10_19 messages_2025_10_19_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_10_19
    ADD CONSTRAINT messages_2025_10_19_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: seed_files seed_files_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.seed_files
    ADD CONSTRAINT seed_files_pkey PRIMARY KEY (path);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_alertas_estoque_ativo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alertas_estoque_ativo ON public.alertas_estoque USING btree (ativo);


--
-- Name: idx_alertas_estoque_criticidade; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alertas_estoque_criticidade ON public.alertas_estoque USING btree (nivel_criticidade);


--
-- Name: idx_alertas_estoque_produto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alertas_estoque_produto ON public.alertas_estoque USING btree (produto_id);


--
-- Name: idx_alertas_estoque_produto_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alertas_estoque_produto_id ON public.alertas_estoque USING btree (produto_id);


--
-- Name: idx_alertas_estoque_tipo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alertas_estoque_tipo ON public.alertas_estoque USING btree (tipo_alerta);


--
-- Name: idx_estoque_localizacao; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_estoque_localizacao ON public.estoque_localizacao USING btree (localizacao_id);


--
-- Name: idx_estoque_produto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_estoque_produto ON public.estoque_localizacao USING btree (produto_id);


--
-- Name: idx_historico_estoque_data; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_historico_estoque_data ON public.historico_estoque USING btree (data_operacao DESC);


--
-- Name: idx_historico_estoque_produto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_historico_estoque_produto ON public.historico_estoque USING btree (produto_id);


--
-- Name: idx_historico_estoque_tipo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_historico_estoque_tipo ON public.historico_estoque USING btree (tipo_operacao);


--
-- Name: idx_historico_estoque_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_historico_estoque_usuario ON public.historico_estoque USING btree (usuario_id);


--
-- Name: idx_localizacoes_almoxarifado; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_localizacoes_almoxarifado ON public.localizacoes USING btree (almoxarifado_id);


--
-- Name: idx_localizacoes_tipo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_localizacoes_tipo ON public.localizacoes USING btree (tipo);


--
-- Name: idx_lotes_numero; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_lotes_numero ON public.lotes USING btree (numero_lote);


--
-- Name: idx_lotes_produto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_lotes_produto ON public.lotes USING btree (produto_id);


--
-- Name: idx_movimentacoes_data; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimentacoes_data ON public.movimentacoes USING btree (realizada_em);


--
-- Name: idx_movimentacoes_produto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimentacoes_produto ON public.movimentacoes USING btree (produto_id);


--
-- Name: idx_movimentacoes_tipo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimentacoes_tipo ON public.movimentacoes USING btree (tipo);


--
-- Name: idx_produtos_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produtos_categoria ON public.produtos USING btree (categoria);


--
-- Name: idx_produtos_sku; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produtos_sku ON public.produtos USING btree (sku);


--
-- Name: idx_produtos_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produtos_status ON public.produtos USING btree (status);


--
-- Name: idx_recebimento_itens_recebimento; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recebimento_itens_recebimento ON public.recebimento_itens USING btree (recebimento_id);


--
-- Name: idx_recebimentos_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recebimentos_status ON public.recebimentos USING btree (status);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_10_13_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_10_13_inserted_at_topic_idx ON realtime.messages_2025_10_13 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_10_14_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_10_14_inserted_at_topic_idx ON realtime.messages_2025_10_14 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_10_15_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_10_15_inserted_at_topic_idx ON realtime.messages_2025_10_15 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_10_16_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_10_16_inserted_at_topic_idx ON realtime.messages_2025_10_16 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_10_17_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_10_17_inserted_at_topic_idx ON realtime.messages_2025_10_17 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_10_18_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_10_18_inserted_at_topic_idx ON realtime.messages_2025_10_18 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_10_19_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_10_19_inserted_at_topic_idx ON realtime.messages_2025_10_19 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- Name: messages_2025_10_13_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_10_13_inserted_at_topic_idx;


--
-- Name: messages_2025_10_13_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_10_13_pkey;


--
-- Name: messages_2025_10_14_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_10_14_inserted_at_topic_idx;


--
-- Name: messages_2025_10_14_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_10_14_pkey;


--
-- Name: messages_2025_10_15_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_10_15_inserted_at_topic_idx;


--
-- Name: messages_2025_10_15_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_10_15_pkey;


--
-- Name: messages_2025_10_16_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_10_16_inserted_at_topic_idx;


--
-- Name: messages_2025_10_16_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_10_16_pkey;


--
-- Name: messages_2025_10_17_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_10_17_inserted_at_topic_idx;


--
-- Name: messages_2025_10_17_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_10_17_pkey;


--
-- Name: messages_2025_10_18_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_10_18_inserted_at_topic_idx;


--
-- Name: messages_2025_10_18_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_10_18_pkey;


--
-- Name: messages_2025_10_19_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_10_19_inserted_at_topic_idx;


--
-- Name: messages_2025_10_19_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_10_19_pkey;


--
-- Name: alertas_estoque update_alertas_estoque_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_alertas_estoque_updated_at BEFORE UPDATE ON public.alertas_estoque FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: alertas_estoque alertas_estoque_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas_estoque
    ADD CONSTRAINT alertas_estoque_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE;


--
-- Name: alertas_estoque alertas_estoque_resolvido_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas_estoque
    ADD CONSTRAINT alertas_estoque_resolvido_por_fkey FOREIGN KEY (resolvido_por) REFERENCES public.profiles(id);


--
-- Name: estoque_localizacao estoque_localizacao_localizacao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque_localizacao
    ADD CONSTRAINT estoque_localizacao_localizacao_id_fkey FOREIGN KEY (localizacao_id) REFERENCES public.localizacoes(id) ON DELETE CASCADE;


--
-- Name: estoque_localizacao estoque_localizacao_lote_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque_localizacao
    ADD CONSTRAINT estoque_localizacao_lote_id_fkey FOREIGN KEY (lote_id) REFERENCES public.lotes(id) ON DELETE SET NULL;


--
-- Name: estoque_localizacao estoque_localizacao_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoque_localizacao
    ADD CONSTRAINT estoque_localizacao_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE;


--
-- Name: historico_estoque historico_estoque_localizacao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historico_estoque
    ADD CONSTRAINT historico_estoque_localizacao_id_fkey FOREIGN KEY (localizacao_id) REFERENCES public.localizacoes(id) ON DELETE SET NULL;


--
-- Name: historico_estoque historico_estoque_lote_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historico_estoque
    ADD CONSTRAINT historico_estoque_lote_id_fkey FOREIGN KEY (lote_id) REFERENCES public.lotes(id) ON DELETE SET NULL;


--
-- Name: historico_estoque historico_estoque_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historico_estoque
    ADD CONSTRAINT historico_estoque_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE;


--
-- Name: historico_estoque historico_estoque_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historico_estoque
    ADD CONSTRAINT historico_estoque_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.profiles(id);


--
-- Name: localizacoes localizacoes_almoxarifado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localizacoes
    ADD CONSTRAINT localizacoes_almoxarifado_id_fkey FOREIGN KEY (almoxarifado_id) REFERENCES public.almoxarifados(id) ON DELETE CASCADE;


--
-- Name: lotes lotes_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE;


--
-- Name: movimentacoes movimentacoes_localizacao_destino_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimentacoes
    ADD CONSTRAINT movimentacoes_localizacao_destino_id_fkey FOREIGN KEY (localizacao_destino_id) REFERENCES public.localizacoes(id) ON DELETE SET NULL;


--
-- Name: movimentacoes movimentacoes_localizacao_origem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimentacoes
    ADD CONSTRAINT movimentacoes_localizacao_origem_id_fkey FOREIGN KEY (localizacao_origem_id) REFERENCES public.localizacoes(id) ON DELETE SET NULL;


--
-- Name: movimentacoes movimentacoes_lote_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimentacoes
    ADD CONSTRAINT movimentacoes_lote_id_fkey FOREIGN KEY (lote_id) REFERENCES public.lotes(id) ON DELETE SET NULL;


--
-- Name: movimentacoes movimentacoes_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimentacoes
    ADD CONSTRAINT movimentacoes_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE;


--
-- Name: movimentacoes movimentacoes_realizada_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimentacoes
    ADD CONSTRAINT movimentacoes_realizada_por_fkey FOREIGN KEY (realizada_por) REFERENCES public.profiles(id) ON DELETE SET NULL;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: recebimento_itens recebimento_itens_localizacao_confirmada_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recebimento_itens
    ADD CONSTRAINT recebimento_itens_localizacao_confirmada_fkey FOREIGN KEY (localizacao_confirmada) REFERENCES public.localizacoes(id);


--
-- Name: recebimento_itens recebimento_itens_localizacao_sugerida_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recebimento_itens
    ADD CONSTRAINT recebimento_itens_localizacao_sugerida_fkey FOREIGN KEY (localizacao_sugerida) REFERENCES public.localizacoes(id);


--
-- Name: recebimento_itens recebimento_itens_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recebimento_itens
    ADD CONSTRAINT recebimento_itens_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE;


--
-- Name: recebimento_itens recebimento_itens_recebimento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recebimento_itens
    ADD CONSTRAINT recebimento_itens_recebimento_id_fkey FOREIGN KEY (recebimento_id) REFERENCES public.recebimentos(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_almoxarifado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_almoxarifado_id_fkey FOREIGN KEY (almoxarifado_id) REFERENCES public.almoxarifados(id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: almoxarifados Usuários autenticados podem acessar almoxarifados; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar almoxarifados" ON public.almoxarifados USING ((auth.role() = 'authenticated'::text));


--
-- Name: estoque_localizacao Usuários autenticados podem acessar estoque; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar estoque" ON public.estoque_localizacao USING ((auth.role() = 'authenticated'::text));


--
-- Name: recebimento_itens Usuários autenticados podem acessar itens de recebimento; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar itens de recebimento" ON public.recebimento_itens USING ((auth.role() = 'authenticated'::text));


--
-- Name: localizacoes Usuários autenticados podem acessar localizações; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar localizações" ON public.localizacoes USING ((auth.role() = 'authenticated'::text));


--
-- Name: lotes Usuários autenticados podem acessar lotes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar lotes" ON public.lotes USING ((auth.role() = 'authenticated'::text));


--
-- Name: movimentacoes Usuários autenticados podem acessar movimentações; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar movimentações" ON public.movimentacoes USING ((auth.role() = 'authenticated'::text));


--
-- Name: produtos Usuários autenticados podem acessar produtos; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar produtos" ON public.produtos USING ((auth.role() = 'authenticated'::text));


--
-- Name: recebimentos Usuários autenticados podem acessar recebimentos; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários autenticados podem acessar recebimentos" ON public.recebimentos USING ((auth.role() = 'authenticated'::text));


--
-- Name: profiles Usuários podem atualizar seus próprios perfis; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários podem atualizar seus próprios perfis" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: profiles Usuários podem ver seus próprios perfis; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários podem ver seus próprios perfis" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: user_roles Usuários podem ver suas próprias roles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuários podem ver suas próprias roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: almoxarifados; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.almoxarifados ENABLE ROW LEVEL SECURITY;

--
-- Name: estoque_localizacao; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.estoque_localizacao ENABLE ROW LEVEL SECURITY;

--
-- Name: localizacoes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.localizacoes ENABLE ROW LEVEL SECURITY;

--
-- Name: lotes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.lotes ENABLE ROW LEVEL SECURITY;

--
-- Name: movimentacoes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.movimentacoes ENABLE ROW LEVEL SECURITY;

--
-- Name: produtos; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: recebimento_itens; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.recebimento_itens ENABLE ROW LEVEL SECURITY;

--
-- Name: recebimentos; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.recebimentos ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: supabase_realtime_messages_publication; Type: PUBLICATION; Schema: -; Owner: supabase_admin
--

CREATE PUBLICATION supabase_realtime_messages_publication WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime_messages_publication OWNER TO supabase_admin;

--
-- Name: supabase_realtime_messages_publication messages; Type: PUBLICATION TABLE; Schema: realtime; Owner: supabase_admin
--

ALTER PUBLICATION supabase_realtime_messages_publication ADD TABLE ONLY realtime.messages;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION calcular_estoque_produto(produto_uuid uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.calcular_estoque_produto(produto_uuid uuid) TO anon;
GRANT ALL ON FUNCTION public.calcular_estoque_produto(produto_uuid uuid) TO authenticated;
GRANT ALL ON FUNCTION public.calcular_estoque_produto(produto_uuid uuid) TO service_role;


--
-- Name: FUNCTION gerar_alertas_estoque(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.gerar_alertas_estoque() TO anon;
GRANT ALL ON FUNCTION public.gerar_alertas_estoque() TO authenticated;
GRANT ALL ON FUNCTION public.gerar_alertas_estoque() TO service_role;


--
-- Name: FUNCTION handle_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_updated_at() TO anon;
GRANT ALL ON FUNCTION public.handle_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.handle_updated_at() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE alertas_estoque; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.alertas_estoque TO anon;
GRANT ALL ON TABLE public.alertas_estoque TO authenticated;
GRANT ALL ON TABLE public.alertas_estoque TO service_role;


--
-- Name: TABLE almoxarifados; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.almoxarifados TO anon;
GRANT ALL ON TABLE public.almoxarifados TO authenticated;
GRANT ALL ON TABLE public.almoxarifados TO service_role;


--
-- Name: TABLE estoque_localizacao; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.estoque_localizacao TO anon;
GRANT ALL ON TABLE public.estoque_localizacao TO authenticated;
GRANT ALL ON TABLE public.estoque_localizacao TO service_role;


--
-- Name: TABLE historico_estoque; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.historico_estoque TO anon;
GRANT ALL ON TABLE public.historico_estoque TO authenticated;
GRANT ALL ON TABLE public.historico_estoque TO service_role;


--
-- Name: TABLE localizacoes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.localizacoes TO anon;
GRANT ALL ON TABLE public.localizacoes TO authenticated;
GRANT ALL ON TABLE public.localizacoes TO service_role;


--
-- Name: TABLE lotes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.lotes TO anon;
GRANT ALL ON TABLE public.lotes TO authenticated;
GRANT ALL ON TABLE public.lotes TO service_role;


--
-- Name: TABLE movimentacoes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.movimentacoes TO anon;
GRANT ALL ON TABLE public.movimentacoes TO authenticated;
GRANT ALL ON TABLE public.movimentacoes TO service_role;


--
-- Name: TABLE produtos; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.produtos TO anon;
GRANT ALL ON TABLE public.produtos TO authenticated;
GRANT ALL ON TABLE public.produtos TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE recebimento_itens; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.recebimento_itens TO anon;
GRANT ALL ON TABLE public.recebimento_itens TO authenticated;
GRANT ALL ON TABLE public.recebimento_itens TO service_role;


--
-- Name: TABLE recebimentos; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.recebimentos TO anon;
GRANT ALL ON TABLE public.recebimentos TO authenticated;
GRANT ALL ON TABLE public.recebimentos TO service_role;


--
-- Name: TABLE user_roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_roles TO anon;
GRANT ALL ON TABLE public.user_roles TO authenticated;
GRANT ALL ON TABLE public.user_roles TO service_role;


--
-- Name: TABLE vw_estoque_consolidado; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vw_estoque_consolidado TO anon;
GRANT ALL ON TABLE public.vw_estoque_consolidado TO authenticated;
GRANT ALL ON TABLE public.vw_estoque_consolidado TO service_role;


--
-- Name: TABLE vw_lotes_vencimento; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vw_lotes_vencimento TO anon;
GRANT ALL ON TABLE public.vw_lotes_vencimento TO authenticated;
GRANT ALL ON TABLE public.vw_lotes_vencimento TO service_role;


--
-- Name: TABLE vw_movimentacoes_recentes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vw_movimentacoes_recentes TO anon;
GRANT ALL ON TABLE public.vw_movimentacoes_recentes TO authenticated;
GRANT ALL ON TABLE public.vw_movimentacoes_recentes TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE messages_2025_10_13; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_10_13 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_10_13 TO dashboard_user;


--
-- Name: TABLE messages_2025_10_14; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_10_14 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_10_14 TO dashboard_user;


--
-- Name: TABLE messages_2025_10_15; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_10_15 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_10_15 TO dashboard_user;


--
-- Name: TABLE messages_2025_10_16; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_10_16 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_10_16 TO dashboard_user;


--
-- Name: TABLE messages_2025_10_17; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_10_17 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_10_17 TO dashboard_user;


--
-- Name: TABLE messages_2025_10_18; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_10_18 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_10_18 TO dashboard_user;


--
-- Name: TABLE messages_2025_10_19; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_10_19 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_10_19 TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.prefixes TO service_role;
GRANT ALL ON TABLE storage.prefixes TO authenticated;
GRANT ALL ON TABLE storage.prefixes TO anon;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

\unrestrict N5sil8kgm1E7dvYJg7AXNMujJKWFH393LqpXF2KNay11tYWVM2Bvk7LH56rgQ16

--
-- PostgreSQL database cluster dump complete
--

