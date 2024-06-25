(function() {

    console.log('Starting')
    
    const openDirectory = document.getElementById('cmd-search-directory')
    const summaryContainer = document.getElementById('summary-container')
    const loadingContainer = document.getElementById('application-loading')

    const INFO_Files = document.getElementById('sumary-files')
    const INFO_Directories = document.getElementById('sumary-dirs')
    const INFO_Pages = document.getElementById('sumary-pages')

    const Summary_Container_ToogleVisibility = ( visibility ) => {

        // Visibility
        summaryContainer.dataset.status = visibility

        console.log( summaryContainer.dataset.status )
        // Status
        let status = summaryContainer.dataset.status
        console.log( status )

        // Toggle
        if ( status == 'false' ) {
            summaryContainer.setAttribute('style', "display: none;")
            summaryContainer.dataset.status = visibility

            
        } else if ( status == 'true' ) {
            summaryContainer.setAttribute('style', "display: block;")
            summaryContainer.dataset.status = visibility
        }

    }

    const Summary_Container_GetStatus = () => {
        return summaryContainer.dataset.status
    }

    const Loading_Start_Wait = () => {
        loadingContainer.setAttribute('style', 'display: block;')
    }

    const Loading_End_Wait = () => {
        loadingContainer.setAttribute('style', 'display: none;')
    }
    
    openDirectory.addEventListener("click", async (event) => {
        try {

            event.preventDefault()

            Summary_Container_ToogleVisibility('false')
            Loading_Start_Wait()

            const DirData = await window.api._OpenDialog()
    

            console.log(DirData)            
            document.querySelector('#input-directory').value = DirData.filepath

            console.log('Tamaño de respuesta:')
            console.log( DirData.filesData.length )
            if ( DirData.filesData.length > 0 ) {
                
                INFO_Files.querySelector(`span.block`).innerHTML = `${ (DirData.filesData.length).toLocaleString("en-EN", { minimumFractionDigits: 0 }) }`
                INFO_Pages.querySelector(`span.block`).innerHTML = `${ (DirData.filesData.reduce((acc, v) => acc += v.pages, 0)).toLocaleString("en-EN", { minimumFractionDigits: 0 }) }`
                INFO_Directories.querySelector('span.block').innerHTML = `${ (DirData.foldersData).toLocaleString("en-EN", { minimumFractionDigits: 0 }) }`

                Loading_End_Wait()
                Summary_Container_ToogleVisibility( 'true' )

            } else {

                Loading_End_Wait()
                Summary_Container_ToogleVisibility( 'false' )

            }


        } catch (error) {
            console.error(error)
        }
    })


})()