# Terminology candidates — unconfirmed

Terms introduced by the v5.1.0 documentation update (active-active replication:
peer-of and mesh). None of them are registered, because
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
| **peer-of mode** (`peerof`) | `api/middleware/redis/v1alpha1/activeredis_types.go` — `ActiveRedisModePeerof`, CRD enum value `peerof` | Hyphenated in prose, bare `peerof` when naming the API value. Confirm the prose spelling. |
| **mesh mode** (`mesh`) | same file — `ActiveRedisModeMesh`; `activeredismesh_types.go` | |
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

3. **"Disaster recovery" as a section name now covers more than disaster
   recovery.** The section `docs/en/functions/95-disaster-recovery/` documents
   both the hot-standby topology (peer-of) and full active-active replication
   (mesh). The page titles were updated; the directory name and the navigation
   label were not.
