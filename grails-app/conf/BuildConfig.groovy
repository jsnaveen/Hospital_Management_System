grails.servlet.version = "3.0" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.work.dir = "target/work"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
//grails.project.war.file = "target/${appName}-${appVersion}.war"

grails.project.fork = [
    // configure settings for compilation JVM, note that if you alter the Groovy version forked compilation is required
    //  compile: [maxMemory: 256, minMemory: 64, debug: false, maxPerm: 256, daemon:true],

    // configure settings for the test-app JVM, uses the daemon by default
    test: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, daemon:true],
    // configure settings for the run-app JVM
    run: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
    // configure settings for the run-war JVM
    war: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
    // configure settings for the Console UI JVM
    console: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256]
]



grails.project.dependency.resolver = "maven" // or ivy
grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // specify dependency exclusions here; for example, uncomment this to disable ehcache:
        // excludes 'ehcache'
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve
//    legacyResolve false // whether to do a secondary resolve on plugin installation, not advised and here for backwards compatibility

    repositories {
        inherits true // Whether to inherit repository definitions from plugins
        // grailsPlugins()
        grailsHome()
        mavenLocal()
        // grailsCentral()
        // mavenCentral()
         


//      https replacement for grailsPlugins()
        mavenRepo 'https://grails.jfrog.io/grails/plugins/'
        // mavenRepo "https://repo.grails.org/artifactory/plugins/"
        mavenRepo "https://repo.grails.org/grails/plugins/"
//      https replacement for grailsCentral()
        mavenRepo 'https://grails.jfrog.io/grails/core/'
//        mavenRepo "https://repo.grails.org/artifactory/core/"
        mavenRepo "https://repo.grails.org/grails/core/"

//      https replacement for mavenCentral()
        mavenRepo "https://repo1.maven.org/maven2/"
        mavenRepo 'https://repo.maven.apache.org/maven2/'
//if by any chance you can't connect to https url use this insecure url
//        mavenRepo 'http://insecure.repo1.maven.org/maven2/'
        mavenRepo 'https://artifacts.alfresco.com/nexus/content/repositories/public/'
        mavenRepo 'http://maven.lolay.com/'
    }

    dependencies {
        // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes e.g.
        runtime 'mysql:mysql-connector-java:5.0.7'

        // String springSecurityVersion = '3.0.7.RELEASE'
        // compile("org.springframework.security:spring-security-core:$springSecurityVersion") {
        //     transitive = false
        // }
        // compile("org.springframework.security:spring-security-web:$springSecurityVersion") {
            // transitive = false
        // }
        // test 'org.hamcrest:hamcrest-core:1.3'
    }

    plugins {
        // plugins for the build system only
        build ":tomcat:7.0.47"

        // plugins for the compile step
        compile ":scaffolding:2.0.1"
        compile ':cache:1.1.1'

        runtime ":cors:1.3.0"

        // plugins needed at runtime but not for compilation
        runtime ":hibernate:3.6.10.6" // or ":hibernate4:4.1.11.6"
        runtime ":database-migration:1.3.8"
        runtime ":jquery:1.10.2.2"
        runtime ":resources:1.2.1"
        compile ":webxml:1.4.1"
        // build (':release:2.2.1', ':rest-client-builder:1.0.3') {
            // export = false
        // }
 
        // Uncomment these (or add new ones) to enable additional resources capabilities
        //runtime ":zipped-resources:1.0.1"
        //runtime ":cached-resources:1.1"
        //runtime ":yui-minify-resources:0.1.5"
    }
}
