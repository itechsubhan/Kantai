import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "app/services/api"

/**
 * Model description here for TypeScript hints.
//  */
// export const HealthCheckModel = types
//   .model("HealthCheck")
//   .props({
//     // guid: types.identifier,
//     // title: "",
//     // pubDate: "", // Ex: 2022-08-12 21:05:36
//     // link: "",
//     // author: "",
//     // thumbnail: "",
//     // description: "",
//     // content: "",
//     // enclosure: types.frozen<Enclosure>(),
//     // categories: types.array(types.string),
//   })
//   .actions(withSetPropAction)
//   .actions((store) => ({
//     async fetchHealth() {
//       // const response = await api.getHealthCheck()
//       // const { data } = await getRootStore(store).api.getFeed(store.guid)
//       // store.setProp(data)
//     }
//   })
//   .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//   .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

// export interface HealthCheck extends Instance<typeof HealthCheckModel> {}
// export interface HealthCheckSnapshotOut extends SnapshotOut<typeof HealthCheckModel> {}
// export interface HealthCheckSnapshotIn extends SnapshotIn<typeof HealthCheckModel> {}
// export const createHealthCheckDefaultModel = () => types.optional(HealthCheckModel, {})
