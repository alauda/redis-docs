# Terminology candidates — unconfirmed

Terms introduced or changed by the v5.1.0 documentation update — the product
rename to Alauda Cache Service E1, and Cross-Datacenter Replication with its
Disaster Recovery and Active-Active modes. None of them are registered,
because this repository has no `TERMINOLOGY.md` — `CLAUDE.md` / `AGENTS.md` reference
`agent/TERMINOLOGY.md`, `TECHNICAL_WRITING_POLICY.md`,
`ARCHITECTURE_FACTS.md`, and `SOURCE_POLICY.md`, and none of those files exist
in the repository.

Every term below is used in customer-facing documentation and **needs human
confirmation** before it can be promoted into a canonical vocabulary. Each
entry cites the code that the term is derived from, so a reviewer can check the
wording against the implementation rather than against prose.

> **Location note.** The agent policy files live under `agent/` at the
> repository root, not under `docs/`: `doom` treats every `.md` under `docs/`
> as a site page and fails the build on one without page frontmatter
> (`yarn build` → `Page "/agent/TERMINOLOGY_CANDIDATES" SSG rendering
> failed`). This file sits at the repository root for the same reason,
> alongside `CLAUDE.md` and `AGENTS.md`.

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

## Sentinel password (added 2026-09-09)

Terms introduced by the documentation of the Web Console's **Set Sentinel
Password** tab (release notes v5.1.0, `functions/10-create-instance.mdx`,
`how_to/access/10-sentinel.mdx`).

| Term as used in docs | Provenance | Note for the reviewer |
|:---|:---|:---|
| **Sentinel password** | `redis-operator/api/databases/v1/redissentinel_types.go:44` — `RedisSentinelSpec.PasswordSecret`, surfaced as `spec.sentinel.passwordSecret`; consumed at `internal/controller/middleware/redis_controller.go:1052` and validated at `internal/webhook/middleware/v1/redis_webhook.go:568` | Used in prose for the credential that authenticates the **Sentinel nodes**, as distinct from the **Redis password** (`spec.passwordSecret`) for the data nodes. The docs previously had no name for it at all. Confirm the pair "Redis password" / "Sentinel password" is the intended customer-facing wording — the Web Console tab labels use exactly this split. |
| **Set Sentinel Password** (Web Console label) | `redis-frontend/src/assets/i18n/en.json:270` — `"set_sentinel_password": "Set Sentinel Password"`; tab defined in `src/app/components/form/template.html:607` | Quoted verbatim as a UI label, so no translation decision is needed. Its sibling label is `set_redis_password` → **Set Redis Password**. |

## Command support and clock synchronization (added 2026-08-11)

Terms introduced by `docs/en/functions/95-disaster-recovery/60-commands.mdx`
(Command Support) and the *Clock synchronization* section now at
`docs/en/functions/95-disaster-recovery/30-active-active/30-operations.mdx`.
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

## Section restructure (added 2026-09-06)

Terms introduced by splitting the *Cross-Datacenter Replication* section into a
shared umbrella plus one sub-section per mode
(`docs/en/functions/95-disaster-recovery/20-disaster-recovery/` and
`.../30-active-active/`). Repository paths are relative to the sibling
checkouts `redis-group/redis-operator` and `redis-group/redis-modules`.

| Term as used in docs | Provenance | Note for the reviewer |
|:---|:---|:---|
| **replication engine** | The shared mechanism described in `10-intro.mdx` — Oplog capture, full and incremental synchronization, log slicing — confirmed shared by both modes at `redis-modules/active-redis/docs/guides/deployment.md:36` (a downstream "connects to and pulls the upstream's oplog" whether the edge came from `as.peerof` or from gossip). | **Coined for these docs**, as an umbrella for "the parts both modes have in common". Needed because the section now separates what is shared from what is per-mode. Confirm, or propose a plainer phrase. |
| **declared links** (Disaster Recovery) / **discovered membership** (Active-Active) | `redis-modules/active-redis/docs/guides/deployment.md:53` — "Membership: `as.peerof` vs `as.mesh`", contrasting "Static (`as.peerof`) — you declare each upstream edge explicitly" with "Gossip auto-mesh (`as.mesh`) — nodes discover each other". | **Coined for these docs.** The module's own pair is *static* / *auto-mesh*; the docs use declared / discovered because "static" reads as "unchanging" rather than "operator-declared". This is the single distinction the two mode sections are organized around, so it deserves confirmation. |
| **membership lifecycle** | `activeredismesh_types.go` — `MeshMemberAlive`, `MeshMemberSuspect`, `MeshMemberDead` | Heading only, for the alive → suspect → dead progression. The state names themselves are already registered above. |
| **announced RESP address** | `activeredis_types.go` — `Access.AnnounceAddress`, `Access.AnnouncePort`; the `mesh-seeds` grammar `host:redis-port@peer-port` in `internal/controller/middleware/activeredis/meshconfig.go:46` | Names the address that identifies a member inside the mesh, as distinct from the peer port that carries the traffic. The component words are already registered; confirm the compound. |

## Backup storage (added 2026-09-07)

Terms introduced by the v5.1.0 release note *PVC Backup and Restore on
Node-Local Storage* and the corresponding correction of
`docs/en/functions/70-backup-restore.mdx`. Repository paths are relative to the
sibling checkout `redis-group/redis-operator`. `ReadWriteOnce` /
`ReadWriteMany` and *access mode* are Kubernetes API vocabulary and are written
out in full; the abbreviations RWO / RWX used in the operator's commit messages
and in `doc/backup-restore-rwo.md` are deliberately kept out of customer docs.

| Term as used in docs | Provenance | Note for the reviewer |
|:---|:---|:---|
| **node-local block storage** | `api/middleware/redis/v1/redisbackup_types.go:64-66` and `api/middleware/redis/v1/redisclusterbackup_types.go:53-55` — the `AccessModes` field doc ("node-local/RWO storage (e.g. TopoLVM)"); `doc/backup-restore-rwo.md` | **Coined for these docs.** The code says "node-local / RWO storage" and names TopoLVM as the example; the docs use neither the abbreviation nor the product name. Confirm the phrase, and confirm that no concrete provider should be named here — the same page still names NFS and Ceph on the `ReadWriteMany` side. |
| **backup volume** | `internal/controller/middleware/redisbackup/service/generator.go:421,433` — the PersistentVolumeClaim the backup Job writes to | Used instead of repeating "backup PVC". The page already names the method **PVC Backup**, so both spellings now appear on it. Confirm which is canonical. |
| **provisioner allow-list** | `chart-middleware/middleware/templates/configmap.yaml` — ConfigMap `middleware-sc-cm-base`, key `middleware_sc_map.yaml`, entry `Redis.backup`. Applied as a hard filter on the dropdown in `redis-group/redis-frontend/modules/meepo-shared/src/lib/components/storage-class/component.ts:148-162` (`items.filter(... supportedStorages[target]?.includes(item.provisioner))`), over the union of `middleware-sc-cm-base` and `middleware-sc-cm` (`.../services/storage-class.service.ts:84-118`, `mergeStorageClassConfigs`) | **Coined for these docs.** Names the platform-side filter that decides which StorageClasses the backup forms offer. The code has no name for it — the one named constant, `BACKUP_SUPPORTED_STORAGE_TYPE`, is unused (`redis-group/redis-frontend/src/app/constants.ts:10-25`). Confirm the phrase. |
| **bundle version** (API `spec.upgradeOption.crVersion`) | `redis-operator` `api/middleware/v1/redis_types.go:32-36` (`CRVersion`, `AutoUpgrade`) and `:339` (`printcolumn` name `Bundle Version`); annotation `middleware.instance/crVersion` in `internal/config/keys.go:44`; tier selection in `pkg/actor/manager.go:107-140` (`Search` takes the highest actor whose `Version()` is not greater than the annotation, defaulting to the operator's own version) | Not new — `docs/en/functions/10-create-instance.mdx:261` already documents the `BUNDLE VERSION` column as "the version number of the operator managing the instance". This is the first place the docs pair that display name with the `crVersion` / `autoUpgrade` API fields, and the first place a docs statement depends on a specific value. `crVersion` is the operator's own version (`internal/vc/generator.go:60,163`, from `REDIS_OPERATOR_VERSION`), so the column is product-version-shaped. **The published threshold `5.1.0` is deliberately conservative**: the code boundary is `4.1.2`, because the frozen `v5.0` tier (`Version()` `4.1.2`, serving `[4.1.2, 5.1.0)`, introduced by `7a7ebc3c` as a verbatim copy of a canonical builder that already carried the network-delivered restore) also skips the mount-based path — so instances pinned at `4.1.2`–`5.0.x` do not in fact need `ReadWriteMany`. Wording chosen by the maintainer 2026-09-07; revisit if the frozen tier changes. |
| **transient in-cluster source** | `internal/ops/restoresource/source.go`; `internal/builder/restorebuilder/source.go`; wired by the base and `v5.0` ensure-resource actors (`internal/ops/{cluster,failover}/actor[/v5.0]/actor_ensure_resource.go`) | **Coined for these docs.** The implementation is a versitygw S3 gateway; the docs deliberately name neither the project nor S3, to avoid confusing it with the **S3 Backup** method on the same page. Confirm the phrase. |

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

3. **Directory and page slugs no longer match the display names — partly
   resolved 2026-09-06.** The section is still titled *Cross-Datacenter
   Replication* while living at `docs/en/functions/95-disaster-recovery/`;
   that top-level slug is **unchanged**, because renaming it would break every
   inbound link into the section at once.

   Inside it, the pages were reorganized into one sub-directory per mode
   (`20-disaster-recovery/`, `30-active-active/`), and `40-mesh.mdx` is gone —
   the Active-Active pages are now `30-active-active/{10-architecture,
   20-setup, 30-operations}.mdx`. The cost was accepted knowingly and is
   bounded: `20-setup.mdx` and `30-failover.mdx` had shipped on `master` and
   their published URLs change, while `40-mesh.mdx`, `50-upgrade-6.0-to-7.2.mdx`
   and `60-commands.mdx` existed only on this unmerged branch and cost nothing
   to move. `doom` has no page-level redirect, so the two changed URLs 404
   rather than forward.

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
