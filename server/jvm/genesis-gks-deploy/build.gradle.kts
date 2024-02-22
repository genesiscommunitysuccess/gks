plugins {
    id("global.genesis.deploy")
}

description = "genesis-gks-deploy"

dependencies {
    genesisServer(
        group = "global.genesis",
        name = "genesis-distribution",
        version = properties["genesisVersion"].toString(),
        classifier = "bin",
        ext = "zip"
    )
    genesisServer(
        group = "global.genesis",
        name = "auth-distribution",
        version = properties["authVersion"].toString(),
        classifier = "bin",
        ext = "zip"
    )

    genesisServer(project(":genesis-gks-distribution", "distribution"))
    genesisServer(project(":genesis-gks-site-specific", "distribution"))
    genesisWeb(":client")

    api(project(":genesis-gks-eventhandler"))
    api(project(":genesis-gks-messages"))
    // Add additional dependencies on other external distributions here
}
tasks {
    copyDependencies {
        enabled = false
    }
}
