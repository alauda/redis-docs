# Terminology candidates — unconfirmed

Terms introduced or changed by the v5.1.0 documentation update — the product
rename to Alauda Cache Service E1, and Cross-Datacenter Replication with its
Disaster Recovery and Active-Active modes. None of them are registered,
because this repository has no `TERMINOLOGY.md` — `CLAUDE.md` / `AGENTS.md` reference
`docs/agent/TERMINOLOGY.md`, `TECHNICAL_WRITING_POLICY.md`,
`ARCHITECTURE_FACTS.md`, and `SOURCE_POLICY.md`, and none of those files exist
in the repository.

Every term below is used in customer-facing documentation and **needs human
confirmation** before it can be promoted into a canonical vocabulary. Each
entry cites the code that the term is derived from, so a reviewer can check the
wording against the implementation rather than against prose.

> **Location note.** `CLAUDE.md` places the agent policy files under
> `docs/agent/`, but `doom` treats every `.md` under `docs/` as a site page and
> fails the build on one without page frontmatter (`yarn build` →
> `Page "/agent/TERMINOLOGY_CANDIDATES" SSG rendering failed`). This file
> therefore sits at the repository root, alongside `CLAUDE.md` and `AGENTS.md`.
> Resolving where the policy files should actually live needs a decision.

Repository paths are relative to the sibling checkouts
`redis-group/redis-operator` and `redis-group/redis-modules`.

| Term as used in docs | Provenance | Note for the reviewer |
|:---|:---|:---|
| **Alauda Cache Service E1** | Product name. Renamed 2026-08-11 from "Alauda Cache Service for Redis OSS" (45 occurrences across `docs/en`, `doom.config.yml`, and `llms.txt`, including the site `title` and `logoText`). Applied to historical release-note sections too, so the docs use one name throughout. | Confirmed with the maintainer. Side effect worth noting: the product name no longer contains "Redis", which removes it from Redis Ltd's nominative-use requirements; remaining references to Redis in the docs describe compatibility with the Redis server and remain ordinary nominative use. |
| **Cross-Datacenter Replication** | Umbrella name for the feature as a whole. Chosen 2026-08-11; replaces the earlier draft wording "active-active replication", which wrongly implied both modes were active-active. | Confirmed with the maintainer. |
| **Disaster Recovery** (API value `peerof`) | `api/middleware/redis/v1alpha1/activeredis_types.go` — `ActiveRedisModePeerof` ("hot-standby / DR"), CRD enum value `peerof` | Display name for the mode; the API value stays `peerof` in YAML. Continues the name shipped in v4.1.0 ("Redis Disaster Recovery Support") and used by the Web Console tab. Confirmed with the maintainer 2026-08-11. |
| **Active-Active** (API value `mesh`) | same file — `ActiveRedisModeMesh`; `activeredismesh_types.go` | Display name for the mode; the API value stays `mesh` in YAML. Chosen over "Mesh" because `mesh` collides with **Service Mesh** in the ACP console (`redis-frontend` uses `label="Service Mesh"`), and over "Multi-Active" because Cockroach Labs brands "Multi-Active Availability" as its own term. Confirmed with the maintainer 2026-08-11. |
| **mesh** (lower case, mechanism only) | `activeredismesh_types.go`; `ActiveRedisMesh` CRD, `spec.seeds`, `status.members` | Retained ONLY for the gossip mechanism and the `ActiveRedisMesh` resource — never as the name of the mode. "Membership is maintained by a gossip mesh" is correct; "mesh mode" is not. |
| **module generation**; **legacy module** / **new module** | `activeredis_types.go` (`ActiveRedisStatus.Version`: "selects the AA module generation"); `internal/webhook/middleware/v1/validation/validation.go:41` ("6.0 (legacy module) and 7.2/8.4 (new Pangaea module)") | The internal codename **Pangaea** was deliberately **not** used in customer docs. Confirm that "legacy module" / "new module" is the intended customer-facing pair. |
| **peer-auth credential**; **peer authentication** | `activeredis_types.go` — `RedisUserName` field doc, `AutoPeerAuthUsername`; `internal/controller/middleware/activeredis/peerauth.go` | Module config keys are `activeredis.peer-auth-user` / `-pass`. |
| **peer port** | `internal/config` `ActiveRedisPeerPort` (7379); `ActiveRedisConnectionSpec.PeerPort` | Two words in prose; `peerPort` when naming the API field. |
| **replication group** | `internal/controller/middleware/redis_peerauth_provision.go` ("the replication group already shares") | Used in place of the older docs term "disaster recovery cluster". Confirm the replacement. |
| **upstream** / **downstream** | `activeredisconnection_types.go` (`UpstreamPeer`), `activeredis_types.go` (`DownstreamPeer`, `downstreamPeerCount`) | Replaces the previous docs usage "source" / "target". Also required by the `redis-group` convention that replication direction is always upstream/downstream. See the inconsistency note below. |
| **announce address** / **announce port** | `activeredis_types.go` — `Access.AnnounceAddress`, `Access.AnnouncePort` | |
| **teardown policy**; **Detach**; **Decommission** | `activeredisconnection_types.go` — `TeardownPolicy`, `TeardownDetach`, `TeardownDecommission` | |
| **fleet floor version** | `activeredismesh_types.go` — `FleetFloorVersion` | Rendered as prose for the status field; confirm whether a plainer phrase is preferred. |
| **version convergence** / **converged** | `activeredismesh_types.go` — `VersionConverged` | |
| **member state** — alive / suspect / dead | `activeredismesh_types.go` — `MeshMemberAlive`, `MeshMemberSuspect`, `MeshMemberDead` | |
| **seed** / **seed list** | `ActiveRedisMeshSpec.Seeds` | |
| **pre-flight inspection** | `activeredisinspection_types.go`; `activeredisconnection_webhook.go` | Named after the Web Console `Inspect` action. |

## Command support and clock synchronization (added 2026-08-11)

Terms introduced by `docs/en/functions/95-disaster-recovery/60-commands.mdx`
(Command Support) and the *Clock synchronization* section of `40-mesh.mdx`.
Repository paths are relative to the sibling checkout
`redis-group/redis-modules/active-redis`.

| Term as used in docs | Provenance | Note for the reviewer |
|:---|:---|:---|
| **last-write-wins** | `src/crdt.zig`; `docs/reference/commands.md` policy legend ("LWW") | Industry-standard CRDT term. The docs spell it out rather than using the abbreviation LWW, which is never introduced. |
| **additive counter** (PN-Counter) | same — policy `P` | PN-Counter is the standard name; "additive counter" is the plain-language gloss the docs lead with. Confirm the pairing. |
| **add-wins set** (observed-remove set) | same — policy `A` | The implementation calls it an OR-Set. "Add-wins set" is chosen because it states the behavior a reader needs; the standard name is given in parentheses. Confirm. |
| **element-level list** | `src/list_crdt.zig`; `docs/reference/commands.md` Lists section (an RGA — Replicated Growable Array) | **Coined for these docs.** RGA is the implementation term and is not customer-facing. "Element-level list" describes the observable property (every element has its own identity, so concurrent list changes converge). Needs confirmation, or a better phrase. |
| **TTL register** | `src/crdt.zig` `ttlMerge`; `docs/reference/commands.md` policy `T` ("TTL-register") | Used unhyphenated in the docs. Confirm the spelling. |
| **tombstone** | `src/tombstone.zig`; the `__arcr_tomb:` / `__arcr_ortomb:` / `__arcr_ftomb:` key families | Already used in `90-limitations.mdx` ("dead-key tombstones"). Now glossed on first use in `60-commands.mdx` and used consistently across the three pages; the earlier draft wording "deletion marker" was removed. |
| **Hybrid Logical Clock** | `src/crdt.zig` (`hlc_value`, `hlc_physical_ms` in `INFO activeredis`) | Industry-standard term, written out in full; the abbreviation HLC is not used in the docs. |
| **clock skew** — advisory tier / critical tier | `src/clockskew.zig` `Tier` (`advisory`, `critical`); `src/runtime.zig` `evalClockSkew` | The module's own words. The critical threshold is derived at `src/runtime.zig` from `CRDTState.TOMBSTONE_MIN_AGE_MS / 2` (`src/crdt.zig` — `300_000` ms), i.e. 150 s. |
| **clock offset** | `activeredismesh_types.go` — `ClockOffsetMs`; module `clock_offset_ms` | Always `remote − local` in milliseconds, positive when the remote clock is ahead — the NTP sign convention, stated explicitly in the docs. |
| **module generation guards** — "refused with an error" / "executed locally, never replicated" / "replicated" | `src/runtime.zig` `ActiveRedis_GlobalFilter`, `isForbiddenInActiveActive`, `isStreamLocalOnlyCmd`, `isFlushLocalOnlyCmd`; `src/command.zig` `rewrite_commands` | The three behavior classes the Command Support page is organized around. They are documentation categories, not names used in the code. Confirm. |

## Known inconsistencies to resolve

1. **"Source side" / "Target side" (Web Console) vs. "upstream" / "downstream"
   (documentation and API).** The console radio labels are literally `Source
   side` and `Target side`; the API status fields are `upstreamPeer` and
   `downstreamPeers`. The documentation now uses upstream/downstream and
   records the mapping explicitly in
   `docs/en/functions/95-disaster-recovery/10-intro.mdx` ("Terminology"). Either
   the console labels or the documented vocabulary should change so the product
   uses one pair.

2. **`announceAddress` path in webhook error messages.** Validation errors and
   several code comments name
   `spec.activeRedis.mesh.announceAddress`, but the generated CRD — and
   therefore what a user actually writes — is
   `spec.activeRedis.proxy.service.announceAddress`. The documentation uses the
   CRD path. The operator's message text should be corrected.

3. **Directory and page slugs no longer match the display names.** The
   section is now titled *Cross-Datacenter Replication* but still lives at
   `docs/en/functions/95-disaster-recovery/`, and the Active-Active page is
   still `40-mesh.mdx`. Slugs were deliberately left unchanged so existing
   inbound links keep working. Renaming them is a separate decision with a
   link-breakage cost.

4. **Console labels lag the docs.** The Web Console has no `ActiveRedisMesh`
   support yet (`redis-frontend` knows `activeredis`,
   `activeredisconnections`, and `activeredisinspections` only), and its
   "Disaster Recovery" tab now happens to be accurate for the `peerof` mode
   specifically. When Active-Active reaches the console, both the tab naming
   and the Source/Target labels should be aligned with this vocabulary.

5. **`maxClockSkewMs` — the API description promises something the operator
   cannot do.** `activeredismesh_types.go` documents the field as "the advisory
   clock-skew alarm threshold (0 disables it)", and the generated CRD repeats
   it. That is true of the module setting
   `activeredis.mesh-max-clock-skew-ms`, but not of the resource:
   `internal/controller/middleware/activeredis/meshconfig.go`
   (`tuningConfigPairs`) pushes only values greater than zero, so `0` means
   "push nothing" and the module keeps its default of `2000` ms — or whatever
   value was last pushed, because the tuning fields are sticky. The
   documentation states the actual behavior and flags the discrepancy; the
   field description should be corrected in the operator.

6. **`maxClockSkewMs` default was documented as `0`.** `40-mesh.mdx` previously
   listed the module default as "`0` (disabled)". The module default is `2000`
   ms (`src/config.zig`, `mesh-max-clock-skew-ms`; also
   `src/context.zig`). Corrected 2026-08-11.

## Trademark scan (2026-08-11)

Performed before adopting the mode names. **Not a legal clearance** — a factual
scan only. Justia, usmarkdb, and the USPTO search API all refused automated
queries, so this rests on search results plus primary vendor pages. A
definitive answer needs a register search or counsel.

| Term | Finding |
|:--|:--|
| **Active-Active** | Clear. Redis Ltd's [trademark policy](https://redis.io/legal/trademark-policy/) enumerates 14 marks (Redis, Redis Software, Redis OSS, Redis CE, Redis Cloud, Redis Insight, Redis Flex, Redis Search, …) and does **not** include Active-Active, CRDB, Replica Of, or Redis Enterprise. Redis's own docs use "Active-Active geo-distributed Redis" and "Active-Active database (formerly known as CRDB)" with no ™/®. No standalone USPTO registration for the bare term surfaced — only compound distinctive brands such as `ACTIVE DATA REPLICATION` (WANdisco, Serial 87434912). Generic across the industry. |
| **Disaster Recovery** | Clear. Ordinary generic technical term; not registrable standalone for this purpose. |
| **Active-Passive** | Clear, same class as Active-Active. Considered and not chosen. |
| **Multi-Active** | **Avoided.** Cockroach Labs presents "Multi-Active Availability" as its own coined term, explicitly contrasted with generic active-active. No ™ and no registration found (their registered mark is COCKROACHDB, Reg. 5307353), but adopting it would read as derivative. |
| **Mesh** | No trademark issue, but collides with **Service Mesh** in the ACP console. Retained only as a mechanism word. |
