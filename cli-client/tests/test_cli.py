import subprocess

def test_healthcheck():
    result = subprocess.run(['se2307', 'healthcheck'], capture_output=True, text=True)
    assert result.returncode == 0

def test_searchtitle():
    result = subprocess.run(['se2307', 'searchtitle', '--titlepart', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_searchtitle_format():
    result = subprocess.run(['se2307', 'searchtitle', '--titlepart', 'example', '--format', 'csv'], capture_output=True, text=True)
    assert result.returncode == 0

def test_searchname():
    result = subprocess.run(['se2307', 'searchname', '--namepart', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_title():
    result = subprocess.run(['se2307', 'title', '--titleID', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_name():
    result = subprocess.run(['se2307', 'name', '--nameid', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_bygenre_req_param():
    result = subprocess.run(['se2307', 'bygenre', '--genre', 'example', '--min', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_bygenre_all_param():
    result = subprocess.run(['se2307', 'bygenre', '--genre', 'example', '--min', 'example', '--from', 'example', '--to', 'example', '--format', 'json'], capture_output=True, text=True)
    assert result.returncode == 0

def test_newnames():
    result = subprocess.run(['se2307', 'newnames', '--filename', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_newtitles():
    result = subprocess.run(['se2307', 'newtitles', '--filename', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_newakas():
    result = subprocess.run(['se2307', 'newakas', '--filename', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_newcrew():
    result = subprocess.run(['se2307', 'newcrew', '--filename', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_newepisode():
    result = subprocess.run(['se2307', 'newepisode', '--filename', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_newprincipals():
    result = subprocess.run(['se2307', 'newprincipals', '--filename', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

def test_newratings():
    result = subprocess.run(['se2307', 'newratings', '--filename', 'example'], capture_output=True, text=True)
    assert result.returncode == 0

# def test_resetall():
#     result = subprocess.run(['se2307', 'healthcheck'], capture_output=True, text=True)
#     print(result.stdout)
#     assert result.returncode == 0