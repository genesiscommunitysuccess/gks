rootProject.name = "genesisproduct-genesis-gks"

buildCache {
    local {
        directory = File(rootDir.parentFile.parent, "build-cache")
        removeUnusedEntriesAfterDays = 30
        isEnabled = true
    }
}

pluginManagement {
    pluginManagement {
        val genesisVersion: String by settings
        val deployPluginVersion: String by settings
        plugins {
            id("global.genesis.build") version genesisVersion
            id("global.genesis.deploy") version deployPluginVersion
        }
    }
    repositories {
        mavenLocal {
            // VERY IMPORTANT!!! EXCLUDE AGRONA AS IT IS A POM DEPENDENCY AND DOES NOT PLAY NICELY WITH MAVEN LOCAL!
            content {
                excludeGroup("org.agrona")
            }
        }
        mavenCentral()
        gradlePluginPortal()
        maven {
            val repoUrl = if(extra.properties["clientSpecific"] == "true") {
                "https://genesisglobal.jfrog.io/genesisglobal/libs-release-client"
            } else {
                "https://genesisglobal.jfrog.io/genesisglobal/dev-repo"
            }
            url = uri(repoUrl)
            credentials {
                username = extra.properties["genesisArtifactoryUser"].toString()
                password = extra.properties["genesisArtifactoryPassword"].toString()
            }
        }
    }
}



include("genesis-gks-config")
include("genesis-gks-messages")
include("genesis-gks-eventhandler")
include("genesis-gks-script-config")
include("genesis-gks-distribution")
include("genesis-gks-dictionary-cache")
include("genesis-gks-dictionary-cache:genesis-gks-generated-sysdef")
include("genesis-gks-dictionary-cache:genesis-gks-generated-fields")
include("genesis-gks-dictionary-cache:genesis-gks-generated-dao")
include("genesis-gks-dictionary-cache:genesis-gks-generated-hft")
include("genesis-gks-dictionary-cache:genesis-gks-generated-view")
include("genesis-gks-deploy")
include("genesis-gks-site-specific")

includeBuild("../../client")
