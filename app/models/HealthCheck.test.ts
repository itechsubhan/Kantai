import { HealthCheckModel } from "./HealthCheck"

test("can be created", () => {
  const instance = HealthCheckModel.create({})

  expect(instance).toBeTruthy()
})
