
// Add your genesis config dependencies here
dependencies {
    implementation(project(":genesis-gks-dictionary-cache:genesis-gks-generated-dao"))
    implementation(project(":genesis-gks-dictionary-cache:genesis-gks-generated-fields"))
    implementation(project(":genesis-gks-dictionary-cache:genesis-gks-generated-hft"))
    implementation(project(":genesis-gks-dictionary-cache:genesis-gks-generated-sysdef"))
    implementation(project(":genesis-gks-dictionary-cache:genesis-gks-generated-view"))

    implementation("global.genesis:auth-config:${properties["authVersion"]}")
}

description = "genesis-gks-dictionary-cache"
