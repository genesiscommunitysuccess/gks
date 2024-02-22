dependencies {
    implementation("global.genesis:genesis-pal-execution")
    implementation("global.genesis:genesis-eventhandler")
    implementation(project(":genesis-gks-messages"))
    api("global.genesis:genesis-db")
    compileOnly(project(":genesis-gks-config"))
    compileOnly(project(path = ":genesis-gks-dictionary-cache", configuration = "codeGen"))
    testImplementation("global.genesis:genesis-dbtest")
    testImplementation("global.genesis:genesis-testsupport")
    testImplementation(project(path = ":genesis-gks-dictionary-cache", configuration = "codeGen"))
}

description = "genesis-gks-eventhandler"