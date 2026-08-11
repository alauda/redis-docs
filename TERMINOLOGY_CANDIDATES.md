# Terminology candidates — unconfirmed

Terms introduced by the v5.1.0 documentation update (Cross-Datacenter
Replication: the Disaster Recovery and Active-Active modes). None of them are
registered, because
this repository has no `TERMINOLOGY.md` — `CLAUDE.md` / `AGENTS.md` reference
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
