import { paths } from "@/config/openapi";

type Endpoint<P extends keyof paths> = P;

export const ENDPOINTS = {
  users: {
    root: "/users" as Endpoint<"/users">,
    me: "/users/me" as Endpoint<"/users/me">,
    byId: "/users/{id}" as Endpoint<"/users/{id}">,
    bulk: "/users/bulk" as Endpoint<"/users/bulk">,
  },
  trainingDays: {
    root: "/training-days" as Endpoint<"/training-days">,
    trainer: "/training-days/trainer" as Endpoint<"/training-days/trainer">,
    bulk: "/training-days/bulk" as Endpoint<"/training-days/bulk">,
    byId: "/training-days/{id}" as Endpoint<"/training-days/{id}">,
    byMonth:
      "/training-days/{month}/{year}" as Endpoint<"/training-days/{month}/{year}">,
    latest: "/training-days/latest" as Endpoint<"/training-days/latest">,
    trainerByClient:
      "/training-days/trainer/{clientId}" as Endpoint<"/training-days/trainer/{clientId}">,
  },
  trainers: {
    root: "/trainers" as Endpoint<"/trainers">,
    byId: "/trainers/{id}" as Endpoint<"/trainers/{id}">,
    bulk: "/trainers/bulk" as Endpoint<"/trainers/bulk">,
    search: "/trainers/search" as Endpoint<"/trainers/search">,
    clients: "/trainers/clients" as Endpoint<"/trainers/clients">,
  },
  clients: {
    root: "/clients" as Endpoint<"/clients">,
    byId: "/clients/{id}" as Endpoint<"/clients/{id}">,
    bulk: "/clients/bulk" as Endpoint<"/clients/bulk">,
    subscribe:
      "/clients/subscribe/{trainerId}" as Endpoint<"/clients/subscribe/{trainerId}">,
    unsubscribe:
      "/clients/unsubscribe/{trainerId}" as Endpoint<"/clients/unsubscribe/{trainerId}">,
    rate: "/clients/{trainerId}/rate" as Endpoint<"/clients/{trainerId}/rate">,
    subscriptions:
      "/clients/subscriptions" as Endpoint<"/clients/subscriptions">,
  },
  body: {
    root: "/body" as Endpoint<"/body">,
    byId: "/body/{id}" as Endpoint<"/body/{id}">,
    me: "/body/me" as Endpoint<"/body/me">,
    bulk: "/body/bulk" as Endpoint<"/body/bulk">,
  },
  auth: {
    telegram: "/auth/telegram" as Endpoint<"/auth/telegram">,
    signup: "/auth/signup" as Endpoint<"/auth/signup">,
    signin: "/auth/signin" as Endpoint<"/auth/signin">,
    refresh: "/auth/refresh" as Endpoint<"/auth/refresh">,
    passwordReset: "/auth/password/reset" as Endpoint<"/auth/password/reset">,
    passwordForgot:
      "/auth/password/forgot" as Endpoint<"/auth/password/forgot">,
    guest: "/auth/guest" as Endpoint<"/auth/guest">,
    registerGuest: "/auth/register-guest" as Endpoint<"/auth/register-guest">, // Добавлено
  },
  tos: {
    root: "/tos" as Endpoint<"/tos">,
    byId: "/tos/{id}" as Endpoint<"/tos/{id}">,
    admin: "/tos/admin" as Endpoint<"/tos/admin">,
    accept: "/tos/accept" as Endpoint<"/tos/accept">,
    current: "/tos/current" as Endpoint<"/tos/current">,
    accepted: "/tos/accepted" as Endpoint<"/tos/accepted">,
  },
  statistics: {
    byTrainingDay:
      "/statistics/{trainingDayId}" as Endpoint<"/statistics/{trainingDayId}">,
    weekly: "/statistics/weekly" as Endpoint<"/statistics/weekly">,
    quick: "/statistics/quick" as Endpoint<"/statistics/quick">,
  },
  progress: {
    exercisesById:
      "/progress/exercises/{exerciseId}" as Endpoint<"/progress/exercises/{exerciseId}">,
  },
  muscleGroups: {
    byId: "/muscle-groups/{id}" as Endpoint<"/muscle-groups/{id}">,
    bulk: "/muscle-groups/bulk" as Endpoint<"/muscle-groups/bulk">,
  },
  languages: {
    byCode: "/languages/{code}" as Endpoint<"/languages/{code}">,
    bulk: "/languages/bulk" as Endpoint<"/languages/bulk">,
  },
  exercises: {
    byId: "/exercises/{id}" as Endpoint<"/exercises/{id}">,
    byMuscleGroup:
      "/exercises/{muscleGroupId}" as Endpoint<"/exercises/muscle-groups/{muscleGroupId}">,
    bulk: "/exercises/bulk" as Endpoint<"/exercises/bulk">,
  },
  chart: {
    weight: "/chart/weight" as Endpoint<"/chart/weight">,
    bmi: "/chart/bmi" as Endpoint<"/chart/bmi">,
  },
  images: {
    upload: "/images/upload" as Endpoint<"/images/upload">,
    uploadAvatar: "/images/upload/avatar" as Endpoint<"/images/upload/avatar">,
    byId: "/images/{id}" as Endpoint<"/images/{id}">,
  },
  analytic: {
    byExercise: "/analytic/{exerciseId}" as Endpoint<"/analytic/{exerciseId}">,
    exercises: "/analytic/exercises" as Endpoint<"/analytic/exercises">,
  },
  settings: "/settings" as Endpoint<"/settings">,
  sync: "/sync" as Endpoint<"/sync">,
};
