plugins {
    distribution
}

dependencies {
    implementation(project(":genesis-gks-config"))
    implementation(project(":genesis-gks-dictionary-cache"))
    implementation(project(":genesis-gks-eventhandler"))
    implementation(project(":genesis-gks-messages"))
    implementation(project(":genesis-gks-script-config"))
}

description = "genesis-gks-distribution"

distributions {
    main {
        contents {
            // Octal conversion for file permissions
            val libPermissions = "600".toInt(8)
            val scriptPermissions = "700".toInt(8)
            into("genesis-gks/bin") {
                from(configurations.runtimeClasspath)
                exclude("genesis-gks-config*.jar")
                exclude("genesis-gks-script-config*.jar")
                exclude("genesis-gks-distribution*.jar")
                include("genesis-gks-*.jar")
            }
            into("genesis-gks/lib") {
                from("${project.rootProject.buildDir}/dependencies")
                duplicatesStrategy = DuplicatesStrategy.EXCLUDE

                exclude("genesis-*.jar")
                exclude("genesis-gks-*.jar")
                exclude("*.zip")

                fileMode = libPermissions
            }
            into("genesis-gks/cfg") {
                from("${project.rootProject.projectDir}/genesis-gks-config/src/main/resources/cfg")
                from(project.layout.buildDirectory.dir("generated/product-details"))
                filter(
                    org.apache.tools.ant.filters.FixCrLfFilter::class,
                    "eol" to org.apache.tools.ant.filters.FixCrLfFilter.CrLf.newInstance("lf")
                )
            }
            into("genesis-gks/scripts") {
                from("${project.rootProject.projectDir}/genesis-gks-config/src/main/resources/scripts")
                from("${project.rootProject.projectDir}/genesis-gks-script-config/src/main/resources/scripts")
                filter(
                    org.apache.tools.ant.filters.FixCrLfFilter::class,
                    "eol" to org.apache.tools.ant.filters.FixCrLfFilter.CrLf.newInstance("lf")
                )
                fileMode = scriptPermissions
            }
            // Removes intermediate folder called with the same name as the zip archive.
            into("/")
        }
    }
}

val distribution by configurations.creating {
    isCanBeConsumed = true
    isCanBeResolved = false
}

// To give custom name to the distribution package
tasks {
    distZip {
        archiveBaseName.set("genesisproduct-genesis-gks")
        archiveClassifier.set("bin")
        archiveExtension.set("zip")
        inputs.files(rootProject.getTasksByName("copyDependencies", true))
    }
    distTar {
        enabled = false
    }
    copyDependencies {
        enabled = false
    }
}

artifacts {
    val distzip = tasks.distZip.get()
    add("distribution", distzip.archiveFile) {
        builtBy(distzip)
    }
}

publishing {
    publications {
        create<MavenPublication>("genesis-gksServerDistribution") {
            artifact(tasks.distZip.get())
        }
    }
}

description = "genesis-gks-distribution"
